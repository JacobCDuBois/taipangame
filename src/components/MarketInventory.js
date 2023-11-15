import React, { useState } from 'react';
import {useGameData} from "../GameDataContext";



function MarketInventory(props){



    const { gameData, setShip, setWallet } = useGameData();



    const subtractAll = (cargo) =>{
        var sell_all = gameData.prices[cargo] * gameData.ship[cargo]
        var temp_ship = gameData.ship
        temp_ship[cargo] = 0
        setShip(temp_ship)
        setWallet(gameData.wallet + sell_all);
    }
    const addAll = (cargo) =>{
        var buy_all = Math.floor(gameData.wallet/gameData.prices[cargo])
        var cost = buy_all * gameData.prices[cargo]
        console.log(buy_all)
        console.log(cost)
        var temp_ship = gameData.ship
        temp_ship[cargo] = temp_ship[cargo] + buy_all
        setWallet(gameData.wallet - cost);
        setShip(temp_ship)

    }
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
        <div className={"container"}>

            <div className={"row"}>
                <div className={"col-md-8 d-flex justify-content-center"}>
                    <div className={"row "}>
                        Cargo
                    </div>

                </div>
                <div className={"col-md-2"}>
                    INV
                </div>
                <div className={"col-md-2"}>
                    PRICE
                </div>

            </div>
            {Object.entries(gameData.prices).map(([cargo, value]) => (
                <div key={cargo}>
                <div className={"row"} >
                    <div className={"col-md-8"}>
                        <div className={"row"}>
                            <div className={"col-md-2"}>
                                <button className={"buy_buttons"} onClick={() => subtractAll(cargo)}>&#x00AB;</button>
                            </div>
                            <div className={"col-md-2"}>
                                <button  className={"buy_buttons"} onClick={() => handleDecrement(cargo)}>-</button>
                            </div>
                            <div className={"col-md-4"}>
                                <span> {cargo}</span>

                            </div>
                            <div className={"col-md-2"}>
                                <button  className={"buy_buttons"} onClick={() => handleIncrement(cargo)}>+</button>
                            </div>
                            <div className={"col-md-2"}>
                                <button  className={"buy_buttons"} onClick={() => addAll(cargo)}>&#x00BB;</button>
                            </div>

                        </div>
                    </div>
                    <div className={"col-md-2"}>
                        <div className={"row"}>
                            <span>{gameData.ship[cargo]}</span>
                        </div>
                    </div>
                    <div className={"col-md-2"}>
                        <div className={"row"}>
                            <span>{gameData.prices[cargo]}</span>
                        </div>
                    </div>



                     </div>

                </div>
            ))}
        </div>
    );

}
export default MarketInventory