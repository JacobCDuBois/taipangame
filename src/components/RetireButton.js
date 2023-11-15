
import React from 'react';
import { useGameData } from '../GameDataContext';

const RetireButton = ({onTravel}) => {

    const { gameData} = useGameData();

    var sum = gameData.wallet + gameData.bank - gameData.debt
    if(sum < 1000000){
        return <div/>
    }
    else{
        return  <button className={"Hong_Kong_btns" } onClick={onTravel}>Retire</button>
    }

}
export default RetireButton