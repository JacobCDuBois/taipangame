import React, { useState } from 'react';
import {useGameData} from "../GameDataContext";
import MarketInventory from "./MarketInventory";
import TravelButton from "./travelButton";
import Bank from "./Bank";
import WareHouseInv from "./WareHouseInv";
function MainMenu(){
    const { gameData} = useGameData();

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
            {temp_menu}
        </div>
    );
}
export default MainMenu