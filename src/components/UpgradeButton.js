
import React from 'react';
import { useGameData } from '../GameDataContext';

const UpgradeButton = () => {
    const { gameData, setShipHealth, setShipMax, setWallet, setShipTotal, setEncounters } = useGameData();
    const buy_ship = (cost, new_hold, new_health) => {

        setWallet(gameData.wallet- cost)
        setShipMax(new_health)
        setShipHealth(new_health)
        setShipTotal(new_hold)
        var temp_encounters = gameData.encounters
        temp_encounters['upgrade'] = false
        setEncounters(temp_encounters)


    }

    if(gameData.encounters['upgrade']){
        var temp_hold = Math.floor(Math.random() * 50) + 1;
        var temp_health = 50
        var cost = Math.floor(temp_hold * (Math.random(Math.random() * (112 - 28 + 1)) + 28))
        if(temp_hold>25) {
            temp_health = 25

        }
        else{
            temp_health = 50
        }
        cost = cost + temp_health
        temp_hold = parseInt(gameData.ship_total) + parseInt(temp_hold)
        temp_health = parseInt(gameData.ship_health_max) + parseInt(temp_health)
        if(cost<= gameData.wallet){
            return <button className={"Hong_Kong_btns" } onClick={()=>buy_ship(cost, temp_hold, temp_health)}>Buy a new ship with {temp_health} health and {temp_hold} storagefor ${cost}</button>
        }



    }

    return <div></div>




}
export default UpgradeButton