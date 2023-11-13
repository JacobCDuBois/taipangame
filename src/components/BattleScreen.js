import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";

const TitleScreen = () => {
    const { setDebt, setBank, setCannons } = useGameData();

    const handleStartGame = (debt) => {
        setDebt(debt);
        setBank(0); // Set initial bank value
        setCannons(0); // Set initial cannons value
    };

    return (
        <div className="title-screen">
            <h1>Welcome to My Text-Based Game</h1>
            <button onClick={() => handleStartGame(4000)}>Start with $4000 Debt</button>
            <button onClick={() => handleStartGame(0)}>Start with 5 Cannons and No Debt</button>
            <Link to="/market">
                <button>Continue to Market</button>
            </Link>
        </div>
    );
};

export default TitleScreen;