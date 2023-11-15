import React, { useState } from 'react';
import {useGameData} from "../GameDataContext";



function Bank(){
    const { gameData, setDebt, setWallet, setBank } = useGameData();
    const [debtInput, setDebtInput] = useState(0);
    const [bankInput, setBankInput] = useState(0);

    const handleIncrement = (acc) => {
        switch (acc) {
            case 1:
                if (gameData.debt < 400 && debtInput + gameData.debt < 1000) {
                    setWallet(gameData.wallet + debtInput);
                    setDebt(gameData.debt + debtInput * 2);
                }
                break;
            case 2:
                if (gameData.wallet >= bankInput) {
                    setWallet(gameData.wallet - bankInput);
                    setBank(gameData.bank + bankInput);
                }
                break;
            // ...
        }
    };

    const handleDecrement = (acc) => {
        switch (acc) {
            case 1:
                if (gameData.wallet >= debtInput) {
                    if(debtInput > gameData.debt){
                        setWallet(gameData.wallet - gameData.debt);
                        setDebt(0);
                    }
                    else{
                        setWallet(gameData.wallet - debtInput);
                        setDebt(gameData.debt - debtInput);
                    }

                } else if (gameData.bank >= debtInput) {
                    if(debtInput > gameData.debt){
                        setBank(gameData.wallet - gameData.debt);
                        setDebt(0);
                    }
                    else{
                        setBank(gameData.bank - debtInput);
                        setDebt(gameData.debt - debtInput);
                    }

                }
                break;
            case 2:
                if (gameData.bank >= bankInput) {
                    setWallet(gameData.wallet + bankInput);
                    setBank(gameData.bank - bankInput);
                }
                break;
            // ...
        }
    };

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-mid-3"}>

                </div>
                <div className={"col-mid-6 d-flex justify-content-center"}>
                    <h1>Debt</h1>

                </div>
                <div className={"col-mid-3"}>

                </div>

            </div>
            <div className={"row"}>
                <div className={"col-md-3"}>
                    <div className={"row"}>
                        <button onClick={() => handleDecrement(1)}>
                            -
                        </button>
                    </div>
                </div>
                <div className={"col-md-6"}>
                    <div className={"row"}>
                            <input
                                type="text"
                                value={debtInput}
                                id="debtInput"
                                onChange={(e) => setDebtInput(Number(e.target.value))}
                            />
                    </div>

                </div>
                <div className={"col-md-3"}>
                    <div className={"row"}>
                        <button onClick={() => handleIncrement(1)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-mid-3"}>

                </div>
                <div className={"col-mid-6 d-flex justify-content-center"}>
                    <h1>Bank</h1>

                </div>
                <div className={"col-mid-3"}>

                </div>

            </div>
            <div className={"row"}>
                <div className={"col-md-3"}>
                    <div className={"row"}>
                        <button onClick={() => handleDecrement(2)}>
                            -
                        </button>
                    </div>
                </div>
                <div className={"col-md-6"}>
                    <div className={"row "}>
                        <input
                            type="text"
                            value={bankInput}
                            id="bankInput"
                            onChange={(e) => setBankInput(Number(e.target.value))}
                        />
                    </div>

                </div>
                <div className={"col-md-3"}>
                    <div className={"row"}>
                        <button onClick={() => handleIncrement(2)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-mid-3"}>

                </div>
                <div className={"col-mid-6 d-flex justify-content-center"}>
                    <h1>Wallet: {gameData.wallet}</h1>

                </div>
                <div className={"col-mid-3"}>

                </div>

            </div>



        </div>
    );
}
export default Bank