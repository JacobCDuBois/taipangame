// GameDataContext.js
import React, { createContext, useContext, useReducer } from 'react';

const price_dicts = {
    general: [
        5,
        15,
        16,
        20,
        25
    ],
    arms: [
        50,
        65,
        80,
        100,
        120
    ],
    silk: [
        450,
        500,
        600,
        650,
        680
    ],
    opium: [
        3200,
        3600,
        4000,
        4300,
        6000

    ]
}
// Initial game data state
const initialGameData = {
    WARE_HOUSE_MAX: 10000,
    warehouse: {
        general: 0,
        opium: 0,
        arms: 0,
        silk: 0,
    },
    pirates:false,
    pirate_counter:0,
    ship_total: 20,
    ship: {
        canons: 0,
        general: 0,
        opium: 0,
        arms: 0,
        silk: 0,
    },
    prices:{
        general: 0,
        opium: 0,
        arms: 0,
        silk: 0,
    },
    bank: 0,
    debt: 0,
    wallet: 0,
    ship_health: 100,
    ship_health_max: 100,
    date: new Date('January 1, 1860'),
    curr_loc:'Hong Kong',
    next_loc:'',
    curr_menu:0
};
const turnEnd  = () => {
    var randDays = Math.floor(Math.random() * (35 - 21 + 1)) + 21;
    return randDays
}
const update_pirates = () =>{
    return Math.ceil(Math.random()*3+1)
}
const remove_pirates = (curr_pirates) =>{
    if(curr_pirates<5){
        return curr_pirates
    }
    else{
        return 5
    }
}
const keys = ['arms', 'silk', 'general', 'opium']
const reset_prices = () =>{
    var temp_dict = {
        arms:0,
        silk:0,
        opium:0,
        general:0
    }
    return temp_dict
}
const set_prices = () =>{
    var temp_dict = {
        arms:0,
        silk:0,
        opium:0,
        general:0
    }
    for(let i=0; i<keys.length; i++){
        var price = 0

        if(Math.random() <= .01){
            if(Math.random()<=.50){
                price = Math.floor(Math.random() * price_dicts[keys[i]][0])
                if (price<2){
                    price = 3
                }
            }
            else{
                price = Math.ceil((Math.random()*10) * price_dicts[keys[i]][4])
            }
        }
        else{
            price = price_dicts[keys[i]][Math.floor(Math.random() * (4 - 0 + 1)) + 0]
        }
        temp_dict[keys[i]] = price
    }
    return temp_dict
}
// Action types
const SET_WAREHOUSE = 'SET_WAREHOUSE';
const SET_SHIP = 'SET_SHIP';
const SET_BANK = 'SET_BANK';
const SET_DEBT = 'SET_DEBT';
const SET_WALLET = 'SET_WALLET';
const SET_SHIP_HEALTH = 'SET_SHIP_HEALTH';
const SET_DATE = 'SET_DATE';
const SET_CURR_LOC = 'SET_CURR_LOC';
const SET_NEXT_LOC = 'SET_NEXT_LOC';
const SET_PRICES  = 'SET_PRICES';
const RESET_PRICES = 'RESET_PRICES'
const SET_PIRATES = 'SET_PIRATES'
const SET_PIRATE_COUNTER = "SET_PIRATE_COUNTER"
const REMOVE_PIRATES = "REMOVE_PIRATES"
const SET_SHIP_MAX = "SET_SHIP_MAX"
const SET_MENU = "SET_MENU"
const RESET_MENU = "RESET_MENU"
// Reducer function
const gameDataReducer = (state, action) => {
    switch (action.type) {
        case SET_WAREHOUSE:
            return { ...state, warehouse: action.payload };
        case SET_SHIP:
            return { ...state, ship: action.payload };
        case SET_PRICES:
            return { ...state, prices: set_prices() };
        case RESET_PRICES:
            return { ...state, prices: reset_prices() };
        case SET_BANK:
            return { ...state, bank: action.payload };
        case SET_DEBT:
            return { ...state, debt: action.payload };
        case SET_WALLET:
            return { ...state, wallet: action.payload };
        case SET_SHIP_HEALTH:
            return { ...state, ship_health: action.payload };
        case SET_SHIP_MAX:
            return { ...state, ship_health_max: action.payload };
        case SET_DATE:
            var days = turnEnd()
            var curr_date = new Date(state.date)
            curr_date.setDate(curr_date.getDate()+days)
            return { ...state, date: curr_date};
        case SET_CURR_LOC:
            return { ...state, curr_loc: action.payload };
        case SET_PIRATES:
            return { ...state, pirates: action.payload };
        case SET_PIRATE_COUNTER:
            var rand = update_pirates()
            return {...state, pirate_counter: state.pirate_counter + rand}
        case SET_NEXT_LOC:
            return { ...state, next_loc: action.payload };
        case REMOVE_PIRATES:
            var diff = remove_pirates(state.pirate_counter)
            return {...state, pirate_counter: state.pirate_counter - diff}
        case SET_MENU:
            return { ...state, curr_menu: action.payload };
        case RESET_MENU:
            return { ...state, curr_menu: 0 };
        default:
            return state;
    }
};

// Context
const GameDataContext = createContext();

// Custom hook to access the context
const useGameData = () => {
    const context = useContext(GameDataContext);
    if (!context) {
        throw new Error('useGameData must be used within a GameDataProvider');
    }
    return context;
};

// Provider component
const GameDataProvider = ({ children }) => {
    const [gameData, dispatch] = useReducer(gameDataReducer, initialGameData);

    const setWarehouse = (warehouse) => dispatch({ type: SET_WAREHOUSE, payload: warehouse });
    const setShip = (ship) => dispatch({ type: SET_SHIP, payload: ship });
    const setBank = (bank) => dispatch({ type: SET_BANK, payload: bank });
    const setDebt = (debt) => dispatch({ type: SET_DEBT, payload: debt });
    const setWallet = (wallet) => dispatch({ type: SET_WALLET, payload: wallet });
    const setShipHealth = (shipHealth) => dispatch({ type: SET_SHIP_HEALTH, payload: shipHealth });
    const setDate = (date) => dispatch({ type: SET_DATE, payload: date });
    const setCurr = (curr_loc) => dispatch({type: SET_CURR_LOC, payload:curr_loc})
    const setNext = (next_loc) => dispatch({type: SET_NEXT_LOC, payload:next_loc})
    const setPrices = (prices) => dispatch({type:SET_PRICES, payload:prices})
    const resetPrices = (prices) => dispatch({type:RESET_PRICES, payload:prices})
    const setPirates = (pirates) => dispatch({type:SET_PIRATES, payload:pirates})
    const remPirateCounter = (pirate_counter) => dispatch({type:REMOVE_PIRATES, payload:pirate_counter})
    const setPirateCounter = (pirate_counter) => dispatch({type:SET_PIRATE_COUNTER, payload:pirate_counter})
    const setShipMax = (ship_health_max) => dispatch({type:SET_SHIP_MAX, payload:ship_health_max})
    const setMenu = (curr_menu) => dispatch({type:SET_MENU, payload:curr_menu})
    const resetMenu = (curr_menu) => dispatch({type:RESET_MENU, payload:curr_menu})
    const value = {
        gameData,
        setWarehouse,
        setShip,
        setBank,
        setDebt,
        setWallet,
        setShipHealth,
        setDate,
        setCurr,
        setNext,
        setPrices,
        resetPrices,
        setPirates,
        setPirateCounter,
        remPirateCounter,
        setShipMax,
        setMenu,
        resetMenu
    };

    return <GameDataContext.Provider value={value}>{children}</GameDataContext.Provider>;
};

export { GameDataProvider, useGameData };
