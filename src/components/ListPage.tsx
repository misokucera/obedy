import React, {Component} from 'react';
import {FilterState} from "../lib/FilterProvider";
import {Restaurant} from "../lib/restaurant";
import RestaurantList from "./RestaurantList";
import styles from "./ListPage.module.css";

type Props = {
    restaurants: Restaurant[],
    filter: FilterState
}

type State = {}

export default class ListPage extends Component<Props, State> {

    state = {};

    render() {
        return (
            <div className={styles['content']}>
                <RestaurantList restaurants={this.props.restaurants} selectable={false} filter={this.props.filter}/>
            </div>
        );
    }
}