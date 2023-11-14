import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";

const TravelScreen = ({ onNavigate }) => {
    const { gameData, setCurr, setNext, } = useGameData();
    const places = ['Hong Kong', 'Shainghai', 'Nagasaki', 'Saigon','Manila','Singapore', 'Batavia']
    const handleStartGame = (debt) => {
// Set initial wallet value
        onNavigate('market'); // Request a screen change
    };
    const handle_loc = (loc) => {
        if(loc !== gameData.curr_loc){
            setNext(loc)
            onNavigate('battle')

        }

    }

    return (
        <div>
            <p>Select a place:</p>
            {places.map((place, index) => (
                <button key={index} onClick={() => handle_loc(place)}>
                    {place}
                </button>
            ))}
        </div>
    );
};

export default TravelScreen;