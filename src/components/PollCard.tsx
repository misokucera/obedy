import React, {Component} from 'react';
import restaurants from "../restaurants.json";
import styles from "./PollCard.module.css";
import Chart, {Option} from "./poll/Chart";
import Card from "./card/Card";
import CardContent from "./card/CardContent";
import TextPlaceholder from "./ui/TextPlaceholder";
import CardHeader from "./card/CardHeader";
import CardFooter from "./card/CardFooter";
import PollProvider, {Results} from "../lib/PollProvider";
import UserNameInput from "./poll/UserNameInput";
import {ListenerReference} from "../lib/Database";
import {RouteComponentProps} from "react-router";
import {Restaurant} from "../lib/restaurant";

type Props = {
    id: string
}

type State = {
    pollId: string,
    pollRef?: ListenerReference,
    updateTime: number,
    options: Option[],
    userCount: number
}

export default class PollCard extends Component<Props, State> {

    state = {
        pollId: '',
        pollRef: undefined,
        updateTime: 0,
        options: [],
        userCount: 0
    };

    componentDidMount() {

        const pollId = this.props.id;

        if (pollId) {
            const ref = PollProvider.subscribe(pollId, this.update);
            const options: Option[] = restaurants.map((restaurant: Restaurant) => {
                return {
                    id: restaurant.id,
                    label: restaurant.name,
                    color: restaurant.color,
                    value: 0,
                    selected: false,
                    users: []
                }
            });
            this.setState({ pollId, pollRef: ref, options });
        }
    }

    componentWillUnmount() {
        const ref = this.state.pollRef;

        if (ref) {
            PollProvider.unsubscribe(ref);
        }
    }

    update = (results: Results, userCount: number) => {
        const options: Option[] = this.state.options.map((option: Option) => {
            const result = results[option.id] || {};
            return {
                ...option,
                value: result.count || 0,
                selected: result.selected || false,
                users: result.users || []
            }
        });

        this.setState({ options, userCount, updateTime: Date.now() });
    };

    vote(options: Option[]) {
        const votes: string[] = options.map(option => option.id);
        PollProvider.update(this.state.pollId, votes)
    }

    handleSelection = (id: string) => {
        const options = this.state.options.filter((option: Option) => option.id === id ? !option.selected : option.selected);
        this.vote(options);
    };

    handleNameChange = () => {
        const options = this.state.options.filter((option: Option) => option.selected);
        this.vote(options);
    };

    render() {
        const content = this.state.updateTime
            ?   <div>
                    <UserNameInput nameChanged={this.handleNameChange}/>
                    <Chart options={this.state.options} onSelectionChange={this.handleSelection}/>
                </div>
            :   <TextPlaceholder/>;

        return (
            <div className={styles['poll']}>
                <div className={styles['sticky']}>
                    <Card>
                        <CardHeader>
                            <h2>Hlasovanie</h2>
                        </CardHeader>
                        <CardContent>
                            {content}
                        </CardContent>
                        <CardFooter>
                            <span>Počet hlasujúcich: <strong>{this.state.userCount}</strong></span>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }
}