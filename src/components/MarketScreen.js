import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";
import MarketInventory from "./MarketInventory";
import TravelButton from "./travelButton";
import HongKong from './HongKong'



const MarketScreen = ({ onNavigate }) => {
    // const { gameData } = useGameData();
    const { gameData, resetMenu} = useGameData();

    function handleTravel(){
        console.log('here')
        resetMenu()
        onNavigate('travel')
        console.log('here')

    }

    if(gameData.curr_loc === "Hong Kong"){
        return(
            <div>
                <HongKong>

                </HongKong>
                <TravelButton onTravel={handleTravel}/>
        </div>
        );
    }
    else{
        return (
            <div>
                <h1>{gameData.curr_loc}</h1>
                <h1>{gameData.wallet}</h1>
                <h1>{gameData.date.toLocaleDateString()}</h1>
                {/* Add market-related components and logic here */}
                <MarketInventory></MarketInventory>
                <TravelButton onTravel={handleTravel}/>


            </div>
        );
    }

};

export default MarketScreen;