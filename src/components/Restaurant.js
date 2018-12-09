import React, {Component} from 'react';
import styles from "./Restaurant.module.css";
import Dish from "./Dish";

class Restaurant extends Component {

    render() {
        const dishes = this.props.dishes.map(dish => {
            return <Dish key={dish.id} name={dish.name} price={dish.price}/>
        });

        const content = dishes.length ? dishes : 'Reštaurácia dnes denné menu nezverejnila';

        return (
            <div className={styles['restuarant']}>
                <h2>{this.props.name}</h2>
                <div>{content}</div>
            </div>
        );
    }
}

export default Restaurant;
