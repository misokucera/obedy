import React, {Component} from 'react';
import RestaurantCard from "./RestaurantCard";
import styles from "./RestaurantList.module.css";

class RestaurantList extends Component {
    render() {
        const restaurants = this.props.restaurants
            .filter(item => item.selected)
            .map(restaurant => <RestaurantCard
                    key={restaurant.id}
                    data={restaurant}
                    filter={this.props.filter}
                />);

        return (
            <div className={styles['list']}>
                {restaurants}
             </div>
        );
    }
}

export default RestaurantList;
