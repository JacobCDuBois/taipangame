import React, { useEffect, useState } from 'react';
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
    } = useGameData();
    const places = ['Hong Kong', 'Shanghai', 'Nagasaki', 'Saigon', 'Manila', 'Singapore', 'Batavia'];
    const [battleLog, setBattleLog] = useState([]);

    const addToBattleLog = (message) => {
        setBattleLog((prevLog) => [...prevLog, message]);
    };

    useEffect(() => {
        const battleSequence = async () => {
            addToBattleLog('Sailing...');
            console.log("sailing")

            // Simulate opium confiscation


            // Simulate storm
            if (gameData.encounters['storm']) {
                if (Math.random() < 0.5) {
                    const randLoc = places[Math.floor(Math.random() * 7)];
                    addToBattleLog(`Caught in a storm, your ship has been damaged and you have been rerouted to ${randLoc}`);
                    setShipHealth((prevHealth) => prevHealth - Math.floor(Math.random() * 6));
                    if (gameData.ship_health <= 0) {
                        addToBattleLog('Your ship has been destroyed. Game Over!');
                        return;
                    }

                    setNext('');
                    setPrices(randLoc);
                    await delay(10000);

                    // onNavigate('market');
                }
                else {
                    // Simulate damage based on chance
                    let baseDamage = 8;
                    const healthPercentage = gameData.ship_health_max / gameData.ship_health;
                    if (Math.random() <= 0.1) {
                        // 10% chance for low damage
                        baseDamage = Math.floor(baseDamage * 0.5);
                    } else if (Math.random() <= 0.05) {
                        // 5% chance for high damage
                        baseDamage = Math.floor(baseDamage * 1.5);
                    }
                    const modDamage = Math.floor(baseDamage * healthPercentage);

                    addToBattleLog(`Caught in a storm, your ship has taken ${modDamage} damage`);
                    setShipHealth((prevHealth) => prevHealth - modDamage);
                    if (gameData.ship_health <= 0) {
                        addToBattleLog('Your ship has been destroyed. Game Over!');
                        return;
                    }

                    setPrices();
                    var temp_encounters = gameData.encounters
                    temp_encounters['storm'] = false
                    setEncounters(temp_encounters)
                    await delay(10000);
                    // onNavigate('market');
                }
            }
            //
            else if (gameData.encounters['battle']) {
                    var temp_encounters = gameData.encounters
                    let numPirates = gameData.pirate_counter + 5;
                    let arrPirates = Array.from({ length: 8 }, () => 4);

                    if (numPirates < 8) {
                        arrPirates = Array.from({ length: numPirates }, () => 4);
                    }

                    while (numPirates > 0) {
                        // Simulate fleeing if no cannons
                        if (gameData.ship.canons < 1) {
                            addToBattleLog(`Fleeing! Your ship has been damaged by ${numPirates} pirates`);
                            setShipHealth((prevHealth) => prevHealth - Math.floor(numPirates));
                            if (Math.random() <= 0.2) {
                                const numShips = Math.floor(Math.random() * 4);
                                numPirates -= numShips;
                                if (numPirates <= 0) {
                                    addToBattleLog('You have escaped the pirates');

                                    setPrices();

                                    temp_encounters['battle'] = false
                                    setEncounters(temp_encounters)
                                    await delay(10000);
                                    return;
                                }
                                if (numPirates < 8) {
                                    arrPirates.splice(numPirates - 1);
                                }
                            }
                        }

                        // Simulate cannon fire
                        for (let i = 1; i <= gameData.ship.canons / 5; i++) {
                            if (Math.random() < 0.1) {
                                setShip((prevShip) => {
                                    const tempShip = { ...prevShip, cannons: prevShip.cannons - 5 };
                                    addToBattleLog('The pirates have taken out a Cannon!');
                                    return tempShip;
                                });
                            }

                            const tempIndex = Math.floor(Math.random() * arrPirates.length);
                            arrPirates[tempIndex] = arrPirates[tempIndex] - 1;

                            if (arrPirates[tempIndex] === 0) {
                                numPirates--;
                                if (numPirates <= 0) {
                                    const plunder = Math.floor(gameData.pirate_counter * Math.random() * (230 - 83) + 83);
                                    addToBattleLog(`You have beaten the pirates and earned ${plunder} in plunder`);
                                    setWallet((prevWallet) => prevWallet + plunder);
                                    setPrices();
                                    temp_encounters['battle'] = false
                                    setEncounters(temp_encounters)
                                    await delay(10000);
                                    return;
                                } else if (numPirates - 1 >= 8) {
                                    arrPirates[tempIndex] = 4;
                                } else {
                                    arrPirates.splice(tempIndex, 1);
                                }
                            }
                        }

                        // Simulate pirate damage
                        const pirateDamage =
                            Math.floor((Math.random() * (2 - 0.6) + 0.6) * arrPirates.length) +
                            Math.floor(Math.random() * (0.1 - 0.03) + 0.03) * numPirates;

                        addToBattleLog(`Your ship has taken ${pirateDamage} damage from the pirates`);
                        setShipHealth((prevHealth) => prevHealth - pirateDamage);

                        if (gameData.ship_health <= 0) {
                            addToBattleLog('Your ship has been destroyed. Game Over!');

                            return;
                        }
                    }

            }
            // else{
            //     // Arrive at the destination
                addToBattleLog(`Arriving in ${gameData.next_loc}`);
                await delay(10000);

            // }


        };

        battleSequence();
        if(gameData.ship_health <=0){
            onNavigate('game_over');
        }
        setCurr(gameData.next_loc);
        setNext('');
        setPrices();
        // await delay(10000);
        onNavigate('market');
    }, [gameData.next_loc, gameData.curr_loc, gameData.ship, gameData.wallet, gameData.ship_health, gameData.ship_health_max, gameData.pirates, gameData.pirate_counter]);

    // Helper function to introduce delays
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div className="title-screen">
            <div>
                {battleLog.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </div>
        </div>
    );
};

export default BattleScreen;
