import React, { useState } from 'react';
import {useGameData} from "../GameDataContext";



function MarketInventory(props){



    const { gameData, setShip, setWallet } = useGameData();




    const handleIncrement = (cargo) => {
        if(gameData.wallet > gameData.prices[cargo]) {


                setWallet(gameData.wallet - gameData.prices[cargo]);
                var temp_ship = gameData.ship
                temp_ship[cargo] = temp_ship[cargo] + 1
                setShip(temp_ship)


        }
    };

    const handleDecrement = (cargo) => {
        if (gameData.ship[cargo]> 0){
                setWallet(gameData.wallet + gameData.prices[cargo])
                var temp_ship = gameData.ship
                temp_ship[cargo] = temp_ship[cargo] - 1
                setShip(temp_ship)
        };
    };
    return (
        <div>


            {Object.entries(gameData.prices).map(([cargo, value]) => (

                <div key={cargo}>
                    <button onClick={() => handleDecrement(cargo)}>-</button>
                    <span>{cargo}/{gameData.ship[cargo]}/{gameData.prices[cargo]}</span>

                    <button onClick={() => handleIncrement(cargo)}>+</button>
                </div>
            ))}
        </div>
    );

}
export default MarketInventory