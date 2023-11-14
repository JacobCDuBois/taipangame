import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";

const BattleScreen = ({ onNavigate }) => {
    const {gameData, setShipHealth, setCurr,setPrices, setNext, setWallet, setShip} = useGameData();
    const places = ['Hong Kong', 'Shainghai', 'Nagasaki', 'Saigon','Manila','Singapore', 'Batavia']
    let baseDamage = 8

    if(gameData.ship.opium > 0){
        if(Math.random()< .3*(1+gameData.ship.opium/gameData.ship_total)){
            var temp_ship = gameData.ship
            temp_ship['opium'] = 0
            setShip(temp_ship)
            setWallet(0)
        }

    }
    if(Math.random() < .01*gameData.wallet){
        var robbed = Math.random()*(0.6)+.4;
        setWallet(gameData.wallet - Math.floor(gameData.wallet * robbed))
    }

    if(Math.random()<=.18){
        if(Math.random()<.5){
            var rand_loc = places[Math.floor(Math.random()*7)]
            while(rand_loc == gameData.curr_loc){
                rand_loc = places[Math.floor(Math.random()*7)]
            }
            setShipHealth(gameData.ship_health - Math.floor(Math.random()*6))
            if(gameData.ship_health<=0){
                onNavigate('game_over')
            }
            setCurr(rand_loc);
            setNext('')
            setPrices()
            onNavigate('market');


        }
        else{
            var healthPercentage = gameData.ship_health_max/gameData.ship_health
            var mod_dmg = Math.floor(baseDamage)
            if (Math.random() <= 0.1) {
                // 10% chance for low damage
                baseDamage = Math.floor(baseDamage * 0.5); // Adjust the multiplier for low damage
                mod_dmg = Math.floor(baseDamage*healthPercentage)
            } else if (Math.random() <= 0.05) {
                // 5% chance for high damage
                baseDamage = Math.floor(baseDamage * 1.5); // Adjust the multiplier for high damage
                mod_dmg = Math.floor(baseDamage*healthPercentage)
            }



            setShipHealth(gameData.ship_health - Math.floor(mod_dmg))
            if(gameData.ship_health<=0){
                onNavigate('game_over')
            }
            setCurr(gameData.next_loc);
            setNext('')
            setPrices()
            onNavigate('market');


        }
    }
    else if(gameData.pirates == true){
        var base_chance = .3
        if (Math.random <= base_chance+(base_chance*(gameData.pirate_counter/80))){
            var num_pirates = gameData.pirate_counter + 5
            var arr_pirates =   Array.from({ length: 8 }, () => 4);
            if(num_pirates<8){
                arr_pirates =   Array.from({ length: num_pirates }, () => 4);
            }
            while(num_pirates > 0){
                if(gameData.ship.canons <1){
                    //flee
                    setShipHealth(gameData.ship_health - Math.floor(num_pirates))
                    if(Math.random()<=.20){
                        var num_ships  = Math.floor(Math.random()*4)
                        num_pirates -= num_ships
                        if(num_pirates<=0){

                            setCurr(gameData.next_loc);
                            setNext('')
                            setPrices()
                            onNavigate('market');
                            //escape

                        }
                        if(num_pirates<8){
                            //remove from arr
                            arr_pirates.splice(num_pirates - 1)
                        }

                    }
                }
                for(let i = 1; i<=gameData.ship.canons;i++){
                    var temp_index = Math.floor(Math.random()*arr_pirates.length)
                    arr_pirates[temp_index] = arr_pirates[temp_index] - 1
                    if(arr_pirates[temp_index] === 0){
                        num_pirates--
                        if(num_pirates<=0){
                            var plunder = Math.floor(gameData.pirate_counter * Math.random() * (230 - 83) + 83);
                            setWallet(gameData.wallet+plunder)
                            setCurr(gameData.next_loc);
                            setNext('')
                            setPrices()
                            onNavigate('market');
                        }
                        else if(num_pirates-1>=8) {
                            arr_pirates[temp_index] = 4
                        }
                        else{
                            arr_pirates.splice(temp_index,1)
                        }
                    }

                }
                var pirate_dmg = (Math.floor((Math.random() * (2 - 0.6) + 0.6)*arr_pirates.length)+(Math.floor(Math.random() * (0.1 - 0.03) + 0.03)*num_pirates))
                setShipHealth(gameData.ship_health - pirate_dmg);
                if(gameData.ship_health<=0){
                    onNavigate('game_over')
                }
            }

        }
    }
    else{
        setCurr(gameData.next_loc);
        setNext('')
        setPrices()
        onNavigate('market')
    }


    return (
        <div className="title-screen">
            Sailing...
        </div>
    );
};

export default BattleScreen;