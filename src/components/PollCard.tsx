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

        Object.keys(result).forEach(userId => {
            const userChoice = result[userId];

            userChoice.restaurantIds.forEach(restaurantId => {
                if (votesPerRestaurant[restaurantId]) {
                    votesPerRestaurant[restaurantId].push(userId);
                } else {
                    votesPerRestaurant[restaurantId] = [userId];
                }
            });
        });

        return Object.keys(votesPerRestaurant).map(restaurantId => {
            const restaurant = this.props.restaurants.find(restaurant => restaurant.id === restaurantId);
            return {
                id: restaurantId,
                label: restaurant ? restaurant.name || '' : '',
                value: votesPerRestaurant[restaurantId].length,
                users: votesPerRestaurant[restaurantId].map(userId => result[userId].userName || ''),
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