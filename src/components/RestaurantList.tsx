import React, {Component} from 'react';
import RestaurantCard from "./RestaurantCard";
import styles from "./RestaurantList.module.css";
import {Restaurant} from "../lib/restaurant";
import {FilterState} from "../lib/FilterProvider";

type Props = {
    restaurants: Restaurant[],
    selectable: boolean,
    filter: FilterState,
    onSelectionChange?: (selection: string[]) => void
}

type State = {
    selection: string[]
}

export default class List extends Component<Props, State> {

    state = {
        selection: []
    };

    handleSelection = (id: string) => {
        let selection: string[] = this.state.selection;
        const index = selection.indexOf(id);

        if (index >= 0) {
            selection.splice(index, 1);
        } else {
            selection.push(id);
        }

        this.setState({ selection }, () => {
            if (this.props.onSelectionChange) {
                this.props.onSelectionChange(this.state.selection);
            }
        });
    };

    render() {
        const selection: string[] = this.state.selection;
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