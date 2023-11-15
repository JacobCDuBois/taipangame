import React, { useEffect, useCallback ,useState, createContext, useContext, useReducer } from 'react';
import { useGameData } from '../GameDataContext';

const BattleScreen = ({ onNavigate }) => {
    const {
        gameData,
        setShipHealth,
        setCurr,
        setPrices,
        setNext,
        setWallet,
        setShip,
        setEncounters,
        setMessage,
        dispatch
    } = useGameData();
    var msg_test = [];
    const [display, setDisplay] = useState();
    const places = ['Hong Kong', 'Shanghai', 'Nagasaki', 'Saigon', 'Manila', 'Singapore', 'Batavia'];

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const battleSequence = async () => {
        var tempDisplay
        var temp_encounters = gameData.encounters
        var temp_ship_health = gameData.ship_health
        var temp_damage = 0
        var max_health = gameData.ship_health_max
        var temp_next =  gameData.next_loc
        var tempCan = Math.ceil(gameData.ship.canons/5);
        var tempWallet = gameData.wallet
        // for(let i = 0; i<5; i++){
        //     console.log(i)
        //     setMessage(gameData.report_message.push('sailing'))
        //     delay(10000)
        //
        // }

        if (temp_encounters['storm']) {
                if (Math.random() < 0.5) {
                    var randLoc = places[Math.floor(Math.random() * 7)];
                    while (randLoc === gameData.next_loc){
                        randLoc = places[Math.floor(Math.random() * 7)];
                    }
                    temp_next = randLoc
                    temp_damage = Math.floor(Math.random() * 6)
                    tempDisplay = (
                        <div>
                            You have hit a storm, the ship took {temp_damage} damage and were blown off course to {randLoc}
                        </div>
                    )
                    setDisplay((prevDisplay) => tempDisplay);
                    await delay(1000);
                    temp_ship_health = temp_ship_health - temp_damage
                    if (temp_ship_health <= 0) {
                        tempDisplay = (
                            <div>
                                The ship is Sinking!
                            </div>
                        )
                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1000);
                        // addToBattleLog('Your ship has been destroyed. Game Over!');

                    }

                    setNext(randLoc);


                    // onNavigate('market');
                }
                else {
                    // Simulate damage based on chance
                    let baseDamage = 8;
                    const healthPercentage = temp_ship_health / max_health
                    if (Math.random() <= 0.1) {
                        // 10% chance for low damage
                        baseDamage = Math.floor(baseDamage * 0.5);
                    } else if (Math.random() <= 0.05) {
                        // 5% chance for high damage
                        baseDamage = Math.floor(baseDamage * 1.5);
                    }
                    const modDamage = Math.floor(baseDamage * healthPercentage);

                    tempDisplay = (
                        <div>
                            You were caught in a storm,took {modDamage} damage!
                        </div>
                    )
                    setDisplay((prevDisplay) => tempDisplay);
                    await delay(1000);
                    // addToBattleLog(`Caught in a storm, your ship has taken {modDamage} damage`);
                    temp_ship_health = temp_ship_health - modDamage
                    // setShipHealth((prevHealth) => prevHealth - modDamage);
                    if (gameData.ship_health <= 0) {
                        tempDisplay = (
                            <div>
                                The ship is Sinking!
                            </div>
                        )
                        setDisplay((prevDisplay) => tempDisplay);
                        // await delay(1000);
                        await delay(1000);
                    }

                    temp_encounters['storm'] = false

                    await delay(10000);
                    // onNavigate('market');
                }
            }
            else if (temp_encounters['battle']) {
                var temp_encounters = gameData.encounters
                var numPirates = gameData.pirate_counter + 5;
                var arrPirates = Array.from({ length: 8 }, () => 4);

                if (numPirates < 8) {
                    arrPirates = Array.from({ length: numPirates }, () => 4);
                }

                while (numPirates > 0) {
                    // Simulate fleeing if no cannons
                    var damage = 0
                    if (tempCan < 1) {
                        // addToBattleLog("Fleeing! Your ship has been damaged by " + {numPirates} + "pirates");
                        tempDisplay = (
                            <div>
                                You are being attacked by {numPirates} pirates! Fleeing!
                            </div>
                        )
                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1000);

                        if (Math.random() <= 0.2) {
                            const numShips = Math.floor(Math.random() * 4);
                            numPirates -= numShips;
                            if (numPirates <= 0) {

                                tempDisplay = (
                                    <div>
                                        You have escaped the pirates
                                    </div>
                                )
                                setDisplay((prevDisplay) => tempDisplay);
                                await delay(1000);


                                temp_encounters['battle'] = false
                            }
                            if (numPirates < 8) {
                                arrPirates.splice(numPirates - 1);
                            }
                        }
                    }

                    // Simulate cannon fire
                    for (let i = 1; i <= tempCan; i++) {
                        tempDisplay = (
                            <div>
                                You are fighting {numPirates} pirates!
                            </div>
                        )
                        setDisplay((prevDisplay) => tempDisplay);
                        if (Math.random() < 0.1) {
                            var tempShip = gameData.ship;
                            tempCan--
                            tempDisplay = (
                                <div>
                                    They have hit a cannon, {tempCan} cannons left!
                                </div>
                            )
                            setDisplay((prevDisplay) => tempDisplay);
                            await delay(1000);
                            if(tempCan < 1 ){
                                break;
                            }
                        }

                        var tempIndex = Math.floor(Math.random() * arrPirates.length);
                        arrPirates[tempIndex] = arrPirates[tempIndex] - 1;

                        if (arrPirates[tempIndex] === 0) {
                            numPirates--;
                            if (numPirates <= 0) {
                                const plunder = Math.floor(gameData.pirate_counter * Math.random() * (230 - 83) + 83);
                                tempDisplay = (
                                    <div>
                                        You have beaten the pirates, you ahve earned ${plunder} in plunder!
                                    </div>
                                )
                                setDisplay((prevDisplay) => tempDisplay);
                                await delay(1000);
                                tempWallet += plunder
                                temp_encounters['battle'] = false
                                return;
                            } else if (numPirates - 1 >= 8) {
                                arrPirates[tempIndex] = 4;
                            } else {
                                arrPirates.splice(tempIndex, 1);
                            }
                        }
                    }

                    if(numPirates >8){
                        damage = Math.floor(8*(1 + Math.random() * 1.5) + Math.floor(numPirates*(0.3 + Math.random())))
                    }
                    else{
                        damage = Math.floor(numPirates*(1 + Math.random() * 1.5))
                    }
                    // setShipHealth(gameData.ship_health - damage);
                    temp_ship_health -= damage
                    tempDisplay = (
                        <div>
                            The ship has taken {damage} damage
                        </div>
                    )
                    setDisplay((prevDisplay) => tempDisplay);
                    await delay(1000);


                    if (gameData.ship_health <= 0) {
                        tempDisplay = (
                            <div>
                                The ship is Sinking!
                            </div>
                        )
                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1000);
                        break;

                    }
                }

            }
            return{
                temp_ship_health,
                temp_encounters,
                temp_next,
                tempCan,
                tempWallet

            }





        // Helper function to introduce delays



    };
    useEffect(() => {
        const runBattle = async () =>{
            var result =  await battleSequence()
            console.log(result)
            setShipHealth(result['temp_ship_health'])
            setEncounters(result['temp_encounters'])
            setCurr(result['temp_next'])
            setNext('')
            var temp_ship = gameData.ship
            temp_ship['canons'] = Math.floor(result['tempCan'] *5)
            setWallet(result['tempWallet'])
            onNavigate('market');

        }
        runBattle()

    }, [setMessage, onNavigate]);
    return (
        <div className="title-screen">
            <div>
                {display}
            </div>
        </div>
    );
}
export default BattleScreen;
