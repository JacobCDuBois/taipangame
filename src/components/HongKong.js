import React, { useState } from 'react';
import {useGameData} from "../GameDataContext";
import MarketInventory from "./MarketInventory";
import TravelButton from "./travelButton";
import Bank from "./Bank";
import WareHouseInv from "./WareHouseInv";
function HongKong(){
    const { gameData, setPirates, setWallet, setPirateCounter, remPirateCounter, setDebt, setMenu, resetMenu } = useGameData();
    var fee = Math.floor((123)*(gameData.pirate_counter))
    const handle_menu = (menu) =>{
        setMenu(menu)
    }

    const payPirates = () => {

        if(gameData.wallet >= fee ){
            setWallet(gameData.wallet - fee)
            setPirates(false)
            remPirateCounter()
        }
        else{
            if(gameData.debt<100){
                var diff = fee - gameData.wallet
                setWallet(0)
                setPirates(false)
                remPirateCounter()
                setDebt(gameData.debt + diff)
            }

        }

    }
    var pirate_button = <div></div>
    if(gameData.pirates === true){
        pirate_button = (
            <div className={"row d-flex"}>

                <button className={"Hong_Kong_btns"} onClick={()=>payPirates()}>Pay Pirates {fee}</button>

            </div>
        )
    }
    var temp_menu;
    switch(gameData.curr_menu){
        case 0:
            temp_menu = (<MarketInventory></MarketInventory>)
            break;
        case 1:
            temp_menu = (<Bank></Bank>)
            break;
        case 2:
            temp_menu = (<WareHouseInv></WareHouseInv>)
            break;
        default:
            temp_menu = (<MarketInventory></MarketInventory>)
            break;
    }
    if(gameData.curr_loc === "Hong Kong"){
        return (
            <div className={"col-md-12"}>
                <div className={"row d-flex"}>

                    <button className={"Hong_Kong_btns"} onClick={()=>handle_menu(1)}>Open Bank</button>
                </div>
                <div className={"row d-flex"}>
                    <button className={"Hong_Kong_btns"} onClick={()=>handle_menu(2)}>Open Warehouse</button>
                </div>
                <div className={"row d-flex"}>

                    <button className={"Hong_Kong_btns"} onClick={()=>handle_menu(0)}>Open Market</button>

                </div>
                {pirate_button}


            </div>
        );
    }
    else{
        return(<div>{gameData.curr_loc}</div>)
    }

}
export default HongKong