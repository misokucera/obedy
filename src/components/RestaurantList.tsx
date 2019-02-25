import React, {Component} from 'react';
import RestaurantCard from "./RestaurantCard";
import styles from "./RestaurantList.module.css";
import {Restaurant} from "../lib/restaurant";
import {FilterState} from "../lib/FilterProvider";

type Props = {
    restaurants: Restaurant[],
    filter: FilterState
}

export default class List extends Component<Props, {}> {
    render() {
        const restaurants = this.props.restaurants
            .map(restaurant => <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    color={restaurant.color}
                    source={restaurant.source}
                    url={restaurant.url}
                    filter={this.props.filter}
                />);

        return (
            <div className={styles['list']}>
                {restaurants}
             </div>
        );
    }
}