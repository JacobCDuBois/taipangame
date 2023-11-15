
import React from 'react';
import { useGameData } from '../GameDataContext';

const RetireButton = () => {
    const { gameData, setShipHealth, setWallet, setEncounters } = useGameData();
    const repair_ship = (cost) => {
        if(gameData.wallet < repair_cost){
            var health = Math.floor(gameData.wallet/(repair_cost/gameData.ship_health_max - gameData.ship_health))

            setShipHealth(gameData.ship_health + health)
            setWallet(gameData.wallet- cost)
        }
        else{
            setShipHealth(gameData.ship_health_max)
            setWallet(gameData.wallet- cost)
        }
        var temp_encounters = gameData.encounters
        temp_encounters['repair'] = false
        setEncounters(temp_encounters)

    }

    if(gameData.encounters.repair){
        if(gameData.ship_health < gameData.ship_health_max){
            var repair_cost = gameData.ship_health_max - gameData.ship_health * (Math.floor(Math.random() * (18 - 3 + 1)) + 3)
            if(gameData.wallet < repair_cost){
                var health = Math.floor(gameData.wallet/(repair_cost/gameData.ship_health_max - gameData.ship_health))
                var repair_cost = Math.floor(gameData.wallet%(repair_cost/gameData.ship_health_max - gameData.ship_health))

            }
            return <button className={"Hong_Kong_btns" } onClick={()=>repair_ship(repair_cost)}>Repair ship {health} health for: ${repair_cost}</button>
        }
    }
    return <div></div>


}
export default RetireButton