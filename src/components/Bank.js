import React, { useState } from 'react';
import {useGameData} from "../GameDataContext";



function Bank(){
    const { gameData, setDebt, setWallet, setBank } = useGameData();

    const handleIncrement = (acc) => {
        switch(acc){

            case 1:
                var debt_diff = document.getElementById('debtInput').value;
                if(/^\d*$/.test(debt_diff)){
                    if(gameData.debt<400 && ((debt_diff+gameData.debt)<1000)){
                        setWallet(gameData.wallet + debt_diff)
                        setDebt(gameData.debt + (debt_diff*2))
                    }
                }
            case 2:
                var bank_diff = document.getElementById('bankInput').value;
                if(/^\d*$/.test(bank_diff)){
                    if(gameData.wallet>=bank_diff){
                        setWallet(gameData.wallet - bank_diff)
                        setBank(gameData.bank + bank_diff)
                    }
                }
            case 3:
                var with_diff = document.getElementById('walletInput').value;
                if(/^\d*$/.test(with_diff)){
                    if(gameData.bank>=with_diff){
                        setWallet(gameData.wallet + with_diff)
                        setBank(gameData.bank - with_diff)
                    }
                }

        }


    };

    const handleDecrement = (acc) => {
        switch(acc){

            case 1:
                var debt_diff = document.getElementById('debtInput').value;
                if(/^\d*$/.test(debt_diff)){
                    if(gameData.wallet >= debt_diff){
                        setWallet(gameData.wallet - debt_diff)
                        setDebt(gameData.debt - (debt_diff))
                    }
                    else if(gameData.bank >= debt_diff){
                        setWallet(gameData.bank - debt_diff)
                        setDebt(gameData.debt - (debt_diff))
                    }
                }
            case 2:
                var bank_diff = document.getElementById('bankInput').value;
                if(/^\d*$/.test(bank_diff)){
                    if(gameData.bank>=bank_diff){
                        setWallet(gameData.wallet + bank_diff)
                        setBank(gameData.bank - bank_diff)
                    }
                }
            // case 3:
            //     var wall_diff = document.getElementById('walletInput').value;
            //     if(/^\d*$/.test(wall_diff)){
            //         if(gameData.bank>=wall_diff){
            //             setWallet(gameData.wallet + wall_diff)
            //             setBank(gameData.bank - wall_diff)
            //         }
            //     }

        }
    };
    return (
        <div>
            <span>debt</span>
            <button onClick={() => handleDecrement(1)}>
            -
            </button>
            <input type="text" value={0} id="debtInput"/>

            <button onClick={() => handleIncrement(1)}>
            +
            </button>

            <span>bank</span>
            <button onClick={() => handleDecrement(2)}>
                -
            </button>
            <input type="text" value={0} id="bankInput"/>

            <button onClick={() => handleIncrement(2)}>
                +
            </button>

            <span>wallet</span>

            <input type="text" value={0} id="walletInput"/>

            <button onClick={() => handleIncrement(3)}>
                +
            </button>

        </div>
    );
}
export default Bank