import React, {Component} from 'react';
import styles from "./Restaurant.module.css";
import Dish from "./Dish";
import Avatar from "./Avatar";
import DateTime from "./DateTime";

const mainCoursePriceThreshold = 75;

class Restaurant extends Component {
    render() {
        let dishes = this.props.dishes;

        if (this.props.showOnlyMainCourse) {
            dishes = this.props.dishes.filter(dish => parseInt(dish.price) > mainCoursePriceThreshold);
        }

        dishes = dishes.map(dish => {
            return <Dish key={dish.id} name={dish.name} price={dish.price}/>
        });

        const content = dishes.length ? dishes : 'Reštaurácia dnes denné menu nezverejnila';
        const classes = [styles['restuarant']];

        if (this.props.updated === 0) {
            classes.push(styles['loading']);
        }

        return (
            <div className={classes.join(' ')}>
                <div className={styles['header']}>
                    <Avatar background={this.props.color}>{this.props.name[0] || ''}</Avatar>
                    <h2>{this.props.name}</h2>
                </div>
                <div className={styles['content']}>
                    {content}
                    <div className={styles['info']}>
                        <DateTime class={styles['date']} timestamp={this.props.updated}/>
                    </div>
                 </div>
            </div>
        );
    }
}

export default Restaurant;
