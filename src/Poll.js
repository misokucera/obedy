import React, {Component} from 'react';
import FirebaseApi from "./lib/FirebaseApi";
import User from "./lib/User";
import restaurants from "./restaurants";
import styles from "./Poll.module.css";
import Chart from "./components/Chart";
import Card from "./components/card/Card";
import CardContent from "./components/card/CardContent";
import TextPlaceholder from "./components/ui/TextPlaceholder";
import CardHeader from "./components/card/CardHeader";
import CardFooter from "./components/card/CardFooter";

class Poll extends Component {

    state = {
        pollId: 0,
        userId: 0,
        pollRef: null,
        restaurants: [...restaurants],
        options: [],
        userCount: 0
    };

    componentDidMount() {

        const pollId = this.props.match.params.id;

        if (pollId) {
            const ref = FirebaseApi.loadPoll(pollId, this.updateVotes);
            const userId = User.getCurrentId();
            this.setState({ userId, pollId, pollRef: ref });
        }
    }

    componentWillUnmount() {
        if (this.state.pollRef) {
            this.state.pollRef.off();
        }
    }

    updateVotes = (snapshot) => {
        const values = snapshot.val();

        if (values && values[this.state.userId]) {
            const currentUserVotes = values[this.state.userId].votes || [];
            const restaurants = this.state.restaurants.map(restaurant => {
                return {
                    ...restaurant,
                    selected: currentUserVotes.indexOf(restaurant.id) > -1
                }
            });
            this.setState({ restaurants });
        }

        let votes = {};
        let userCount = 0;

        for (const userId in values) {
            if (values[userId].votes) {
                userCount++;
                values[userId].votes.forEach(vote => {
                    votes[vote] = votes[vote] ? votes[vote] + 1 : 1;
                });
            }
        }

        const options = this.state.restaurants.map(restaurant => {
            return {
                id: restaurant.id,
                label: restaurant.name,
                color: restaurant.color,
                value: votes[restaurant.id] || 0,
                selected: restaurant.selected
            }
        });

        this.setState({ options, userCount });
    };

    vote = () => {
        FirebaseApi.updatePoll(this.state.pollId, this.state.userId, {
            votes: this.state.restaurants
                .filter(restaurant => restaurant.selected)
                .map(restaurant => restaurant.id)
        })
    };

    handleSelection = (id) => {
        const restaurants = this.state.restaurants.map(restaurant => {
            return {
                ...restaurant,
                selected: restaurant.id === id ? !restaurant.selected : restaurant.selected
            }
        });

        // TODO: volat vote priamo
        this.setState({ restaurants }, this.vote);
    };

    render() {
        const content = this.state.options.length
            ? <Chart options={this.state.options} onSelectionChange={this.handleSelection}/>
            : <TextPlaceholder/>;

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

export default Poll;
