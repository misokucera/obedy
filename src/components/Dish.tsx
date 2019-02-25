import React, {Component} from 'react';
import styles from "./Dish.module.css";

type Props = {
    name: string,
    price: string
}

export default class Dish extends Component<Props, {}> {
    render() {
        return (
            <div className={styles['dish']}>
                <span>{this.props.name}</span>
                <span className={styles['price']}>{this.props.price}</span>
            </div>
        );
    }
}