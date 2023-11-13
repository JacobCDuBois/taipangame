import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TitleScreen.css';
import {useGameData} from "../GameDataContext";
import MarketInventory from "./MarketInventory";

const gen_prices = [
    5,
    15,
    16,
    20,
    25
]
const arm_prices = [
    50,
    65,
    80,
    100,
    120
]
const silk_prices = [
    450,
    500,
    600,
    650,
    680
]
const opium_prices = [
    3200,
    3600,
    4000,
    4300,
    6000

]
const all_prices = [gen_prices, arm_prices, silk_prices, opium_prices]



function setWallet(value){

}
const MarketScreen = ({ onNavigate }) => {
    // const { gameData } = useGameData();
    const { gameData, setDebt, setWallet } = useGameData();
    const setWalletDiff = (value) =>{
        setWallet(gameData.wallet + value)
    }
    const getRandPrice = (prices) =>{
        var price = 0

        if(Math.random() <= .01){
            if(Math.random()<=.50){
                price = Math.floor(Math.random() * prices[0])
                if (price<2){
                    price = 3
                }
            }
            else{
                price = Math.ceil((Math.random()*10) * prices[4])
            }
        }
        else{
            price = prices[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
        }
        console.log(price)
        return price

    }
    const getPrices = () => {
        var prices = {
            general:0,
            opium:0,
            silk:0,
            arms:0
        }
        prices.general = getRandPrice(gen_prices)
        prices.arms = getRandPrice(arm_prices)
        prices.opium = getRandPrice(opium_prices)
        prices.silk = getRandPrice(silk_prices)

        return prices
    }
    var temp_prices = getPrices()

    return (
        <div>
            <h1>{gameData.curr_loc}</h1>
            {/* Add market-related components and logic here */}
            <MarketInventory bank={gameData.bank} ship={gameData.ship} prices={temp_prices} setWall = {setWalletDiff()}></MarketInventory>
            <button onClick={() => onNavigate('title')}>Go back to Title Screen</button>
        </div>
    );
};

export default MarketScreen;