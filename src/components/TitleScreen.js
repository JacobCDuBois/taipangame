import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";



const TitleScreen = ({ onNavigate }) => {
    const { gameData, setDebt, setWallet, setPrices, setShip} = useGameData();

    const handleStartGame = (in_debt) => {
        if(in_debt){
            setDebt(1000);
            setWallet(400000);
        }
        else{
            var temp_ship = gameData.ship
            temp_ship.canons = 5 * 5
            setShip(temp_ship)
        }
        setPrices();
         // Set initial wallet value
        onNavigate('market');
        // Request a screen change
    };

    return (
        <div className={"container"}>
            <div className={"row"}>
            <div className={"col-md-3"}>

            </div>
            <div className={"col-md-6"}>
                <h1>Welcome to Your Game</h1>
                <button onClick={() => handleStartGame(true)}>Start with $4000 Debt</button>
                <button onClick={() => handleStartGame(false)}>Start with 5 Cannons and No Debt</button>
            </div>
            <div className={"col-md-3"}>

            </div>

            </div>
        </div>
    );
};

export default TitleScreen;