import React, {Component} from 'react';
import styles from "./PollCard.module.css";
import Chart, {Option} from "./poll/Chart";
import Card from "./card/Card";
import CardContent from "./card/CardContent";
import CardHeader from "./card/CardHeader";
import CardFooter from "./card/CardFooter";
import {Result} from "../lib/PollProvider";
import UserNameInput from "./poll/UserNameInput";
import {ListenerReference} from "../lib/Database";
import {Restaurant} from "../lib/restaurant";

type Props = {
    result: Result,
    restaurants: Restaurant[]
}

type State = {
    pollRef?: ListenerReference,
    updateTime: number
}

export default class PollCard extends Component<Props, State> {

    state = {
        pollRef: undefined,
        updateTime: 0
    };

    generateOptions(result: Result): Option[] {

        let votesPerRestaurant: { [key: string]: string[] } = {};

        Object.keys(result).forEach(index => {
            const userVotes: string[] = result[index].restaurantIds || [];
            userVotes.forEach(vote => {
                if (votesPerRestaurant[vote]) {
                    votesPerRestaurant[vote].push(index);
                } else {
                    votesPerRestaurant[vote] = [index];
                }
            });
        });

        return Object.keys(votesPerRestaurant).map(index => {
            const restaurant = this.props.restaurants.find(restaurant => restaurant.id === index);
            return {
                id: index,
                label: restaurant ? restaurant.name || '' : '',
                value: votesPerRestaurant[index].length,
                users: votesPerRestaurant[index],
                selected: true,
                color: restaurant ? restaurant.color || '' : ''
            }
        });
    }

    render() {
        const userCount = Object
            .keys(this.props.result)
            .map(i => this.props.result[i])
            .filter(item => item.restaurantIds).length;

        const options = this.generateOptions(this.props.result);

        return (
            <div className={styles['poll']}>
                <div className={styles['sticky']}>
                    <Card>
                        <CardHeader>
                            <h2>Hlasovanie</h2>
                        </CardHeader>
                        <CardContent>
                            <UserNameInput/>
                            <Chart options={options} />
                        </CardContent>
                        <CardFooter>
                            <span>Počet hlasujúcich: <strong>{userCount}</strong></span>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }
}