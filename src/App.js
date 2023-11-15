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
        <div className={"App container"}>
            <header className="App-header">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/css/bootstrap.min.css"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/js/bootstrap.min.js"></script>

            </header>
            <div className={"row"}>
                <div className={"col-md-3"}>
                </div>
                <div className={"col-md-6 game_container"}>
                    <GameDataProvider>
                        {currentScreen === 'title' && <TitleScreen onNavigate={handleNavigate} />}
                        {currentScreen === 'market' && <MarketScreen onNavigate={handleNavigate} />}
                        {currentScreen === 'travel' && <TravelScreen onNavigate={handleNavigate} />}
                        {currentScreen === 'battle' && <BattleScreen onNavigate={handleNavigate} />}
                        {currentScreen === 'game_over' && <GameOverScreen onNavigate={handleNavigate} />}
                    </GameDataProvider>
                </div>
            </div>

    </div>
    );
};


export default App;

