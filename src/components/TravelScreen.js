import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";

const TitleScreen = ({ onNavigate }) => {
    const { gameData, setDebt, setWallet } = useGameData();

    const handleStartGame = (debt) => {
        setDebt(debt);
        setWallet(0); // Set initial wallet value
        onNavigate('market'); // Request a screen change
    };

    return (
        <div>
            <h1>Welcome to Your Game</h1>
            <button onClick={() => handleStartGame(4000)}>Start with $4000 Debt</button>
            <button onClick={() => handleStartGame(0)}>Start with 5 Cannons and No Debt</button>
        </div>
    );
};

export default TitleScreen;