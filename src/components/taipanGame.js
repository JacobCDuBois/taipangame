import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TitleScreen from './TitleScreen';
import '../styles/Game.css';

const Game = () => {
    return (
        <div className="game-container">
            {/* Your game content goes here */}
            <h2>Your Text-Based Game</h2>
            {/* Add more components as needed */}
        </div>
    );
};
export default Game;