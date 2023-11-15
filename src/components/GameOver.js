import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";

const GameOver = ({ onNavigate }) => {
    const { gameData, setCurr, setNext, set } = useGameData();



    return (
        <div>
            GAME OVER
        </div>
    );
};

export default GameOver;