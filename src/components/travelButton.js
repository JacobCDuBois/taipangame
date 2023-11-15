
import React from 'react';
import { useGameData } from '../GameDataContext';

const TravelButton = ({onTravel}) => {

    const { gameData} = useGameData();

    var sum = Object.values(gameData.ship).reduce((acc, currentValue) => acc + currentValue, 0);
    if(sum > gameData.ship_total ){
        return <div/>
    }
    else{
        return  <button className={"Hong_Kong_btns"} onClick={onTravel}>Travel</button>

    }

}
export default TravelButton