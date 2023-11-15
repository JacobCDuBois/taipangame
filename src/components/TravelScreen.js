import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";

const TravelScreen = ({ onNavigate }) => {
    const { gameData, setCurr, setNext, setDate, setDebt, setBank} = useGameData();
    const places = ['Hong Kong', 'Shainghai', 'Nagasaki', 'Saigon','Manila','Singapore', 'Batavia']

    const handle_loc = (loc) => {
        if(loc !== gameData.curr_loc){
            setNext(loc)
            setDate()
            onNavigate('battle')
            setDebt(Math.ceil(gameData.debt * 1.1))
            setBank(Math.ceil(gameData.bank * 1.05))

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