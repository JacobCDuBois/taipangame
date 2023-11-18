import  '../styles/Game.css';
const ShipDisplay = ({value}) => {
    var class_name

    switch (value){
        case 0:
            class_name = 'ship_div ship_none'
            break;
        case 1:
            class_name = 'ship_low ship_div'
            break;
        case 2:
            class_name = 'ship_med ship_div'
            break;
        case 3:
            class_name = 'ship_div ship_high'
            break;
        default:
            class_name = 'ship_div ship_none'


    }

    return (
        <div className={class_name}>
            {value}
        </div>
    );
}
export default ShipDisplay