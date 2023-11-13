import React, { useState } from 'react';



function MarketInventory(props){

    var ship = props.ship;
    var money = props.money;
    var prices = props.prices;

    const [counters, setCounters] = useState({
        opium:ship.opium,
        general:ship.general,
        arms:ship.arms,
        silk:ship.silk

    });


    const handleIncrement = (cargo) => {
        setCounters((prevCounters) => {
            if(money > prices[cargo]){
                props.setWall(prices[cargo])
                return {
                    ...prevCounters,
                    [cargo]: prevCounters[cargo] + 1,
                };
            }

        });
    };

    const handleDecrement = (cargo) => {
        setCounters((prevCounters) => {
            if (prevCounters[cargo]> 0){

            }
            return {
                ...prevCounters,
                [cargo]: prevCounters[cargo] - 1,
            };
        });
    };
    return (
        <div>


            {Object.entries(counters).map(([cargo, value]) => (

                <div key={cargo}>
                    <button onClick={() => handleDecrement(cargo)}>-</button>
                    <span>{cargo}/{value}/{prices[cargo]}</span>

                    <button onClick={() => handleIncrement(cargo)}>+</button>
                </div>
            ))}
        </div>
    );
}
export default MarketInventory