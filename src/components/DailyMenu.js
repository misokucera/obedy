import React, {Component} from 'react';
import Dish from "./Dish";

class DailyMenu extends Component {
    render() {
        const dishes = this.props.dishes.map(item => {
            const dish = item.dish;
            return <Dish key={dish.dish_id} name={dish.name} price={dish.price}/>
        });

        return (
            <div>{dishes}</div>
        );
    }
}

export default DailyMenu;
