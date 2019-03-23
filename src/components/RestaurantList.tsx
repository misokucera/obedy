import React, {Component} from 'react';
import RestaurantCard from "./RestaurantCard";
import styles from "./RestaurantList.module.css";
import {Restaurant} from "../lib/restaurant";
import {FilterState} from "../lib/FilterProvider";

type Props = {
    restaurants: Restaurant[],
    selection: string[],
    selectable: boolean,
    filter: FilterState,
    onSelectionChange?: (id: string) => void
}

export default class List extends Component<Props, {}> {

    handleSelection = (id: string) => {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(id);
        }
    };

    render() {
        const selection: string[] = this.props.selection;
        const restaurants = this.props.restaurants
            .map(restaurant => <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    color={restaurant.color}
                    source={restaurant.source}
                    selectable={this.props.selectable}
                    selected={selection.indexOf(restaurant.id) >= 0}
                    url={restaurant.url}
                    onSelect={this.handleSelection}
                    filter={this.props.filter}
                />);

        return (
            <div className={styles['list']}>
                {restaurants}
             </div>
        );
    }
}