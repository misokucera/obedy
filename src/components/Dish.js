import React, {Component} from 'react';
import styles from "./Dish.module.css";

class Dish extends Component {
    render() {
        const classNames = [styles['dish']];

        const isFood = parseInt(this.props.price) > 75;
        if (isFood) classNames.push(styles['is-food']);

        return (
            <div className={classNames.join(' ')}>
                <span>{this.props.name}</span>
                <span className={styles['price']}>{this.props.price}</span>
            </div>
        );
    }
}

export default Dish;
