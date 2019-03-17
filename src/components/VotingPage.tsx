import React, {Component} from 'react';
import RestaurantList from "./RestaurantList";
import PollCard from "./PollCard";
import {Restaurant} from "../lib/restaurant";
import {FilterState} from "../lib/FilterProvider";
import styles from "./VotingPage.module.css";
import PollProvider from "../lib/PollProvider";

type Props = {
    restaurants: Restaurant[],
    filter: FilterState,
    pollId: string
}

export default class VotingPage extends Component<Props, {}> {

    handleSelectionChange = (selection: string[]) => {
        PollProvider.update(this.props.pollId, selection);
    };

    render() {
        return (
            <div className={styles['content']}>
                <RestaurantList
                    restaurants={this.props.restaurants}
                    filter={this.props.filter}
                    selectable={true}
                    onSelectionChange={this.handleSelectionChange}
                />
                <PollCard id={this.props.pollId}/>
            </div>
        );
    }
}