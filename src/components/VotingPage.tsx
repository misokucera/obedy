import React, {Component} from 'react';
import RestaurantList from "./RestaurantList";
import PollCard from "./PollCard";
import {Restaurant} from "../lib/restaurant";
import {FilterState} from "../lib/FilterProvider";
import styles from "./VotingPage.module.css";
import PollProvider, {Voting} from "../lib/PollProvider";
import {ListenerReference} from "../lib/Database";
import ActiveUser from "../lib/ActiveUser";

type Props = {
    restaurants: Restaurant[],
    filter: FilterState,
    pollId: string
}

type State = {
    pollRef?: ListenerReference,
    voting: Voting
}

export default class VotingPage extends Component<Props, State> {

    state = {
        pollRef: undefined,
        voting: {} as Voting
    };

    componentDidMount() {
        if (this.props.pollId) {
            const ref = PollProvider.subscribe(this.props.pollId, this.handleAllVoteChanges);
            this.setState({ pollRef: ref });
        }
    }

    componentWillUnmount() {
        const ref = this.state.pollRef;

        if (ref) {
            PollProvider.unsubscribe(ref);
        }
    }

    handleAllVoteChanges = (voting?: Voting) => {
        if (voting) {
            this.setState({ voting })
        }
    };

    handleSelectionChange = (id: string) => {
        let selection = this.getActiveUserSelection();

        const index = selection.indexOf(id);

        if (index >= 0) {
            selection.splice(index, 1);
        } else {
            selection.push(id);
        }

        PollProvider.update(this.props.pollId, selection);
    };

    getActiveUserSelection(): string[] {
        const activeUser = ActiveUser.getId();

        if (this.state.voting && this.state.voting[activeUser]) {
            return this.state.voting[activeUser].votes || [];
        }

        return [];
    }

    render() {
        return (
            <div className={styles['content']}>
                <RestaurantList
                    restaurants={this.props.restaurants}
                    filter={this.props.filter}
                    selectable={true}
                    selection={this.getActiveUserSelection()}
                    onSelectionChange={this.handleSelectionChange}
                />
                <PollCard voting={this.state.voting}  restaurants={this.props.restaurants}/>
            </div>
        );
    }
}