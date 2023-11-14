import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './components/taipanGame';
import './styles/App.css';
import TitleScreen from "./components/TitleScreen";
import {GameDataProvider} from "./GameDataContext";
import MarketScreen from "./components/MarketScreen";
import TravelScreen from "./components/TravelScreen";
import BattleScreen from "./components/BattleScreen";
import GameOverScreen from './components/GameOver'

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('title');

    const handleNavigate = (screen) => {
        setCurrentScreen(screen);
    };

    return (
        <GameDataProvider>
            {currentScreen === 'title' && <TitleScreen onNavigate={handleNavigate} />}
            {currentScreen === 'market' && <MarketScreen onNavigate={handleNavigate} />}
            {currentScreen === 'travel' && <TravelScreen onNavigate={handleNavigate} />}
            {currentScreen === 'battle' && <BattleScreen onNavigate={handleNavigate} />}
            {currentScreen === 'game_over' && <GameOverScreen onNavigate={handleNavigate} />}
        </GameDataProvider>
    );
};


export default App;

// let data = {
//     WARE_HOUSE_MAX:10000,
//     warehouse:{
//         general:0,
//         opium:0,
//         arms:0,
//         silk:0
//     },
//     ship_total:20,
//     ship:{
//         canons:0,
//         general:0,
//         opium:0,
//         arms:0,
//         silk:0
//     },
//     bank:0,
//     debt:0,
//     wallet:0,
//     ship_health:100,
//     date:0
//
// }