import React, {Component} from 'react';
import styles from "./Dish.module.css";

class Dish extends Component {
    render() {
        return (
            <div className={styles['dish']}>
                <span>{this.props.name}</span>
                <span className={styles['price']}>{this.props.price}</span>
            </div>
        );
    }
}

export default Dish;
