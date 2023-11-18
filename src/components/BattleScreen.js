import React, { useEffect, useCallback ,useState, createContext, useContext, useReducer } from 'react';
import { useGameData } from '../GameDataContext';
import  '../styles/Game.css';
import ShipDisplay from './shipDisplay'
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
        // dispatch
    } = useGameData();
    var msg_test = [];
    const [display, setDisplay] = useState();
    const places = ['Hong Kong', 'Shanghai', 'Nagasaki', 'Saigon', 'Manila', 'Singapore', 'Batavia'];
    const get_display = (newMessage,battle) =>{
        return(<div className="battle_container d-flex justify-content-center">
                <div className="d-flex flex-column col-md-12 justify-content-between align-items-center">
                    <div id="game" className="row battle_dis">
                        <div className="col-md-10">
                            <div className="row pt-5" >
                                <div className="flex-wrap ship_container justify-content-evenly">
                                    {battle.map((value, index) => (
                                        <ShipDisplay key={index} value={value} />
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>

                    <div id="msg" className="row message_box justify-content-center">
                        <div className="col-md-9">
                            <div className="row ">
                                {newMessage}
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
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
        var arrPirates = Array.from({ length: 8 }, () => 0);
        var pirateCounter = gameData.pirate_counter
        var numPirates = 0
        var startPirates = 0
        var tempMsg = ""
        arrPirates[4] = 3
        // for(let i = 0; i<5; i++){
        //     console.log(i)
        //     setMessage(gameData.report_message.push('sailing'))
        //     delay(15000)
        //
        // }

        if (temp_encounters['storm']) {
                if (Math.random() < 0.5) {
                    var randLoc = places[Math.floor(Math.random() * 7)];
                    while (randLoc === temp_next){
                        randLoc = places[Math.floor(Math.random() * 7)];
                    }
                    temp_next = randLoc
                    temp_damage = Math.floor(Math.random() * 6)
                    tempMsg = "You have hit a storm, the ship took " + temp_damage + "damage and were blown off course to " + randLoc
                    tempDisplay = get_display(tempMsg, arrPirates)
                    setDisplay((prevDisplay) => tempDisplay);
                    await delay(1500);
                    temp_ship_health = temp_ship_health - temp_damage
                    if (temp_ship_health <= 0) {
                        tempMsg = "The ship is Sinking!"
                        tempDisplay = get_display(tempMsg, arrPirates)

                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1500);
                        // addToBattleLog('Your ship has been destroyed. Game Over!');

                    }
//?
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


                    tempMsg = "You were caught in a storm, took " + modDamage + " damage!"
                    tempDisplay = get_display(tempMsg, arrPirates)

                    setDisplay((prevDisplay) => tempDisplay);
                    await delay(1500);
                    // addToBattleLog(`Caught in a storm, your ship has taken {modDamage} damage`);
                    temp_ship_health = temp_ship_health - modDamage
                    // setShipHealth((prevHealth) => prevHealth - modDamage);
                    if (temp_ship_health <= 0) {
                        tempMsg = "The ship is Sinking!"
                        tempDisplay = get_display(tempMsg, arrPirates)

                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1500);
                        // addToBattleLog('Your ship has been destroyed. Game Over!');

                    }

                    temp_encounters['storm'] = false
                    temp_encounters['battle'] = false
                    await delay(15000);
                }
            }


            else if (temp_encounters['battle']) {
                arrPirates[4] = 0;
                arrPirates[5] = 3;

                tempMsg = "Sailing..."
                tempDisplay = get_display(tempMsg, arrPirates)

                setDisplay((prevDisplay) => tempDisplay);
                await delay(1500);



                // var temp_encounters = gameData.encounters
                numPirates = pirateCounter + 5;
                startPirates = numPirates
                arrPirates = Array.from({ length: 8 }, () => 3);

                if (numPirates < 8) {
                    arrPirates = Array.from({ length: numPirates }, () => 3);
                }

                while (numPirates > 0) {
                    console.log(numPirates)
                    // Simulate fleeing if no cannons
                    var damage = 0
                    if (tempCan < 1) {
                        // addToBattleLog("Fleeing! Your ship has been damaged by " + {numPirates} + "pirates");


                        tempMsg =  "You are being attacked by " + numPirates + " pirates! Fleeing!"
                        tempDisplay = get_display(tempMsg, arrPirates)
                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1500);

                        if (Math.random() <= 0.2) {
                            const numShips = Math.floor(Math.random() * 4);
                            numPirates -= numShips;
                            if (numPirates <= 0) {

                                arrPirates = Array.from({ length: 8 }, () => 0);
                                tempMsg ="You have escaped the pirates"
                                tempDisplay = get_display(tempMsg, arrPirates)

                                setDisplay((prevDisplay) => tempDisplay);
                                await delay(1500);


                                temp_encounters['battle'] = false
                            }
                            if (numPirates <= 8) {
                                arrPirates = Array.from({ length: startPirates }, () => 0);
                                for(let k = numPirates-1; k>=0; k--){
                                    arrPirates[k] = 3
                                }

                            }
                        }
                    }

                    // Simulate cannon fire
                    for (let i = 1; i <= tempCan; i++) {
                        tempMsg =  "You are fighting " + numPirates + " pirates!"
                        tempDisplay = get_display(tempMsg, arrPirates)
                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1000);


                        var tempIndex
                        if(numPirates<arrPirates.length){
                            tempIndex = Math.floor(Math.random() * numPirates);
                        }
                        else{
                            tempIndex = Math.floor(Math.random() * arrPirates.length);
                        }


                        arrPirates[tempIndex] = arrPirates[tempIndex] - 1;

                        if (arrPirates[tempIndex] === 0) {
                            numPirates--;
                            if (numPirates <= 0) {
                                const plunder = Math.floor(gameData.pirate_counter * Math.random() * (230 - 83) + 83);

                                tempMsg =  "you have beaten the pirates! you earned " + plunder + " in plunder"
                                tempDisplay = get_display(tempMsg, arrPirates)
                                setDisplay((prevDisplay) => tempDisplay);
                                await delay(1000);
                                tempWallet += plunder
                                temp_encounters['battle'] = false
                            } else if (numPirates >= 8) {
                                arrPirates[tempIndex] = 3;
                            }
                            else if(numPirates <= 8) {
                                arrPirates.splice(tempIndex, 1)
                                arrPirates.push(0)

                            }
                        }
                    }
                    if (Math.random() < 0.1) {
                        tempCan = tempCan - 1
                        tempMsg =  "They have hit a cannon! " + tempCan + " cannons remaining"
                        tempDisplay = get_display(tempMsg, arrPirates)
                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1000);
                        if(tempCan < 1 ){
                            break;
                        }
                    }
                    else if(numPirates >8){
                        damage = Math.floor(4*(1 + Math.random() * 1.5) + Math.floor(numPirates*(0.3 + Math.random())))
                    }
                    else{
                        damage = Math.floor(numPirates*(1 + Math.random() * 1.5))
                    }
                    // setShipHealth(gameData.ship_health - damage);
                    temp_ship_health = temp_ship_health - damage
                    tempMsg =  "your ship has taken " + damage + " damage " + temp_ship_health + " health remaining"
                    tempDisplay = get_display(tempMsg, arrPirates)
                    setDisplay((prevDisplay) => tempDisplay);
                    await delay(1000);


                    if (temp_ship_health <= 0) {
                        tempMsg = "The ship is Sinking!"
                        tempDisplay = get_display(tempMsg, arrPirates)

                        setDisplay((prevDisplay) => tempDisplay);
                        await delay(1500);
                        // addToBattleLog('Your ship has been destroyed. Game Over!');

                    }
                }

            }
            else{
                arrPirates[4] = 0;
                arrPirates[5] = 3;

                tempMsg = "Sailing..."
                tempDisplay = get_display(tempMsg, arrPirates)

                setDisplay((prevDisplay) => tempDisplay);
                await delay(1500);
            }
            arrPirates[5] = 0;
            arrPirates[6] = 3;

            tempMsg = "Sailing..."
            tempDisplay = get_display(tempMsg, arrPirates)

            setDisplay((prevDisplay) => tempDisplay);
            await delay(1500);
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
            console.log('await battle')
            var result =  await battleSequence()
            console.log("ran battle")
            console.log(result)
            setShipHealth(result['temp_ship_health'])
            setEncounters(result['temp_encounters'])
            setCurr(result['temp_next'])
            setNext('')
            setPrices()
            var temp_ship = gameData.ship
            temp_ship['canons'] = Math.floor(result['tempCan'] *5)
            setShip(temp_ship)
            setWallet(result['tempWallet'])
            // setWallet(10000)
            // return result
            await delay(1000)
            onNavigate('market')


        }
        runBattle()
        // var test = runBattle()
        // console.log(test)


    }, []);
    return (
            <div className={"battle_container"}>
                {display}
            </div>
    );
}
export default BattleScreen;
