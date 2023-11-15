import React from 'react';
import { useGameData } from '../GameDataContext';
import  '../styles/Game.css';
const GamePanel = () => {

    const { gameData} = useGameData();
    var free_space = gameData.ship_total
    for (const key in gameData.ship) {
        if (gameData.ship.hasOwnProperty(key)) {
            free_space -= gameData.ship[key];
        }
    }
    var wares = 0
    for (const key in gameData.warehouse) {
        if (gameData.warehouse.hasOwnProperty(key)) {
            wares += gameData.warehouse[key];
        }
    }
    var percent_health = gameData.ship_health/gameData.ship_health_max
    var fill_style = {
        width: '${percent_health}%'
    }
    return (
        <div className={"col-md-12"}>
            <div className={"row"}>
                {gameData.date.toLocaleDateString()}
            </div>
            <div className={"row"}>
                Balance:{gameData.wallet}
            </div>
            <div className={"row"}>
                Bank: {gameData.bank}
            </div>
            <div className={"row"}>
                Debt: {gameData.debt}
            </div>
            <div className={"row"}>
                Total Space: {gameData.ship_total}
            </div>
            <div className={"row"}>
                Cannons: {gameData.ship.canons/5}
            </div>
            <div className={"row"}>
                Free Space: {free_space}

            </div>
            <div className={"row"}>
                HK Warehouse: {wares}/10000

            </div>
            <div>
                <div className="health-bar">
                    <div className="health-fill" style={fill_style}></div>
                    <div className="health-text">{gameData.ship_health}/{gameData.ship_health_max}</div>
                </div>
            </div>

        </div>

    )

}
export default GamePanel