
import React from 'react';
import { useGameData } from '../GameDataContext';

const CanonButton = () => {
    const { gameData, setWallet, setEncounters } = useGameData();
    const buy_cannon = (cost) => {
        var temp_ship = gameData.ship
        temp_ship['canons'] = temp_ship['canons'] + 5
        setWallet(gameData.wallet- cost)
        var temp_encounters = gameData.encounters
        temp_encounters['canon'] = false
        setEncounters(temp_encounters)


    }

    if(gameData.encounters['canon']){
        var cost = Math.floor(gameData.ship.canons*(Math.random(Math.random() * (112 - 28 + 1)) + 28))
        if(cost<= gameData.wallet){
            return <button className={"Hong_Kong_btns" } onClick={()=>buy_cannon(cost)}>Buy another Cannon for${cost.toString()}</button>
        }


    }

    return <div></div>




}
export default CanonButton