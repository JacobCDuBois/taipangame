import React, { useState } from 'react';
import {useGameData} from "../GameDataContext";
import MarketInventory from "./MarketInventory";
import TravelButton from "./travelButton";
import Bank from "./Bank";
import WareHouseInv from "./WareHouseInv";
function HongKong(){
    const { gameData, setPirates, setWallet, setPirateCounter, remPirateCounter, setDebt, setMenu, resetMenu } = useGameData();
    const handle_menu = (menu) =>{
        setMenu(menu)
    }
    if(!gameData.pirates){
        if(Math.random()<=.20){
            setPirates(true)
            setPirateCounter()
        }
    }
    const payPirates = () => {
        var fee = Math.floor((Math.floor(Math.random() * (50 - 35 + 1)) + 35)*(gameData.pirate_counter))
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
    return (
        <div>
            <h1>{gameData.curr_loc}</h1>
            <h1>{gameData.wallet}</h1>
            <h1>{gameData.date.toLocaleDateString()}</h1>
            <button onClick={()=>handle_menu(1)}>Open Bank</button>
            <button onClick={()=>handle_menu(2)}>Open Warehouse</button>
            <button onClick={()=>handle_menu(0)}>Open Market</button>
            {temp_menu}

            {/*{tab}*/}
            {/* Add market-related components and logic here */}
            {}
            {/*<MarketInventory></MarketInventory>*/}
            {/*<TravelButton onTravel={handleTravel}/>*/}


        </div>
    );
}
export default HongKong