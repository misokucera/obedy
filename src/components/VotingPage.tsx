import React, {Component, Fragment} from 'react';
import RestaurantList from "./RestaurantList";
import PollCard from "./PollCard";
import {Restaurant} from "../lib/restaurant";
import {FilterState} from "../lib/FilterProvider";
import styles from "./VotingPage.module.css";

type Props = {
    restaurants: Restaurant[],
    filter: FilterState,
    pollId: string
}

type State = {
    selection: string[]
}

export default class VotingPage extends Component<Props, State> {

    state = {
        selection: []
    };

    render() {
        return (
            <div className={styles['content']}>
                <RestaurantList restaurants={this.props.restaurants} filter={this.props.filter} selectable={true}/>
                <PollCard id={this.props.pollId}/>
            </div>
        );
    }
}