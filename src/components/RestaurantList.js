import React, {Component} from 'react';
import Restaurant from "./Restaurant";
import styles from "./RestaurantList.module.css";

class RestaurantList extends Component {
    render() {
        const restaurants = this.props.restaurants
            .filter(item => item.selected)
            .map(restaurant => <Restaurant key={restaurant.id} name={restaurant.name} dishes={restaurant.dishes}/>);

        return (
            <div className={styles['list']}>
                {restaurants}
             </div>
        );
    }
}

export default RestaurantList;
