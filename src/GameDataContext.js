// GameDataContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initial game data state
const initialGameData = {
    WARE_HOUSE_MAX: 10000,
    warehouse: {
        general: 0,
        opium: 0,
        arms: 0,
        silk: 0,
    },
    ship_total: 20,
    ship: {
        canons: 0,
        general: 0,
        opium: 0,
        arms: 0,
        silk: 0,
    },
    bank: 0,
    debt: 0,
    wallet: 0,
    ship_health: 100,
    date: 0,
    curr_loc:'Hong Kong',
    next_loc:''
};

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

// Reducer function
const gameDataReducer = (state, action) => {
    switch (action.type) {
        case SET_WAREHOUSE:
            return { ...state, warehouse: action.payload };
        case SET_SHIP:
            return { ...state, ship: action.payload };
        case SET_BANK:
            return { ...state, bank: action.payload };
        case SET_DEBT:
            return { ...state, debt: action.payload };
        case SET_WALLET:
            return { ...state, wallet: action.payload };
        case SET_SHIP_HEALTH:
            return { ...state, ship_health: action.payload };
        case SET_DATE:
            return { ...state, date: action.payload };
        case SET_CURR_LOC:
            return { ...state, date: action.payload };
        case SET_NEXT_LOC:
            return { ...state, date: action.payload };
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
        setNext
    };

    return <GameDataContext.Provider value={value}>{children}</GameDataContext.Provider>;
};

export { GameDataProvider, useGameData };
