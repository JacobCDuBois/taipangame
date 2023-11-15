import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";
import MarketInventory from "./MarketInventory";
import TravelButton from "./travelButton";
import HongKong from './HongKong'
import GamePanel from "./gamePanel";
import MainMenu from "./MainMenu";
import RetireButton from "./RetireButton";
import RepairButton from "./RepairButton";
import UpgradeButton from "./UpgradeButton";
import CanonButton from "./CanonButton";
import RandomEncounterSet from './RandomChanger'

const MarketScreen = ({ onNavigate }) => {
    // const { gameData } = useGameData();
    const { gameData, resetMenu, setMessage, setPirates, setPirateCounter, setEncounters, setShip, setWallet} = useGameData();
    const generate_random = () =>{
        var temp_dict = {
            upgrade:false,
            canon:false,
            repair:false,
            storm:false,
            battle:false,
            robbed:false,
            cops:false
        }
        //upgrade odds
        if(Math.random()<.2){
            temp_dict['upgrade'] = true
        }
        //cannon
        if(Math.random()<.2){
            temp_dict['canon'] = true
        }
        //repair odds
        if(Math.random()<.4){
            if(gameData.ship_health < gameData.ship_health_max){
                temp_dict['repair'] = true
            }
        }
        //will storm
        if(Math.random() <= 0.18){
            temp_dict['storm'] = true
        }

        //battle
        if (gameData.pirates) {
            const baseChance = 0.3;
            if (Math.random() <= baseChance + baseChance * (gameData.pirate_counter / 80)){
                temp_dict['battle'] = true
            }
        }
        else{
            if(Math.random()<=.20){
                setPirates(true)
                setPirateCounter()
            }
        }

        if (gameData.ship.opium > 0 && Math.random() < 0.1 * (1 + gameData.ship.opium / gameData.ship_total)) {
            temp_dict["cops"] = true
        }

        // Simulate robbery
        if (Math.random() < 0.00001 * gameData.wallet) {
            temp_dict['robbed'] = true
        }
        return temp_dict
    }
    function handleTravel(screen){
        resetMenu()
        setEncounters(generate_random())
        setEncounters(generate_random())
        setMessage([""])

        if (gameData.encounters['cops']) {
            // addToBattleLog('The authorities have confiscated your illegal opium and your money');
            // setShip((prevShip) => ({ ...prevShip, opium: 0 }));
            // setWallet(0);
            var temp_ship = gameData.ship
            temp_ship['opium'] = 0
            setShip(temp_ship)
            setWallet(0)
            var temp_encounters = gameData.encounters
            temp_encounters['cops'] = false
            setEncounters(temp_encounters)

            // setMessage([...gameData.report_message, 'The authorities have confiscated your illegal opium and your money']);
        }

        // Simulate robbery
        if (gameData.encounters['robbed']) {
            const robbed = Math.floor(gameData.wallet * (Math.random() * 0.6 + 0.4));
            setWallet(gameData.wallet - robbed)
            // addToBattleLog(`You have been robbed of $${robbed.toFixed(2)}`);
            // setWallet((prevWallet) => prevWallet - Math.floor(prevWallet * robbed));
            var temp_encounters = gameData.encounters
            temp_encounters['robbed'] = false
            setEncounters(temp_encounters)
            // setMessage([...gameData.report_message, '`You have been robbed of $${robbed}']);

        }
        onNavigate(screen)

    }


        return(
            <div className={"container"}>
                <div className={"row"}>

                <div className={"col-md-8 pt-5 d-flex flex-column align-items-center"}>
                    <div className={"row "}>
                        <h1>{gameData.curr_loc}</h1>
                    </div>
                    <div className={"row"}>
                        <MainMenu/>
                    </div>
                    <div className="row">
                        {Array.isArray(gameData.report_message) ? (
                            gameData.report_message.map((msg, index) => (
                                <div className="row" key={index}>
                                    <span>{msg}</span>
                                </div>
                            ))
                        ) : (
                            <div className="row">
                                {console.log("tesst")}
                                {console.log(gameData.curr_loc)}
                                <span>Arriving in {gameData.curr_loc}</span>
                            </div>
                        )}
                    </div>

                </div>
                <div className={"col-md-4 pt-2"}>
                    <GamePanel/>
                    <HongKong/>
                    <div className={"row"}>
                        {/*<TravelButton onTravel={handleTravel('travel')}/>*/}
                        <TravelButton onTravel={() => handleTravel('travel')} />

                        <RetireButton onTravel={() => handleTravel('game_over')}></RetireButton>
                        <RepairButton></RepairButton>
                        <UpgradeButton></UpgradeButton>
                        <CanonButton></CanonButton>

                    </div>
                </div>
                </div>
            </div>
        );


};

export default MarketScreen;