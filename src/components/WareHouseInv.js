import React, { useState } from 'react';
import {useGameData} from "../GameDataContext";



function WareHouseInv(props){



    const { gameData, setShip, setWarehouse } = useGameData();
    const handleIncrement = (cargo) => {
        var sum = Object.values(gameData.warehouse).reduce((acc, currentValue) => acc + currentValue, 0);
        if(gameData.ship[cargo] > 0 && sum<gameData.WARE_HOUSE_MAX) {

            var temp_ship = gameData.ship
            var temp_ware = gameData.warehouse
            temp_ship[cargo] = temp_ship[cargo] - 1
            temp_ware[cargo] = temp_ware[cargo] + 1
            setShip(temp_ship)
            setWarehouse(temp_ware)



        }
    };

    const handleDecrement = (cargo) => {
        if (gameData.warehouse[cargo]> 0){
            var temp_ship = gameData.ship
            var temp_ware = gameData.warehouse
            temp_ship[cargo] = temp_ship[cargo] + 1
            temp_ware[cargo] = temp_ware[cargo] - 1
            setShip(temp_ship)
            setWarehouse(temp_ware)
        };
    };
    return (
        <div>


            {Object.entries(gameData.warehouse).map(([cargo, value]) => (

                <div key={cargo}>
                    <button onClick={() => handleDecrement(cargo)}>-</button>
                    <span>{cargo}/{gameData.ship[cargo]}/{gameData.warehouse[cargo]}</span>

                    <button onClick={() => handleIncrement(cargo)}>+</button>
                </div>
            ))}
        </div>
    );
}
export default WareHouseInv