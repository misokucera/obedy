import React, {Component} from 'react';
import restaurants from "../restaurants";
import styles from "./Poll.module.css";
import Chart from "./poll/Chart";
import Card from "./card/Card";
import CardContent from "./card/CardContent";
import TextPlaceholder from "./ui/TextPlaceholder";
import CardHeader from "./card/CardHeader";
import CardFooter from "./card/CardFooter";
import PollProvider from "../lib/PollProvider";
import UserNameInput from "./poll/UserNameInput";

class PollCard extends Component {

    state = {
        pollId: 0,
        pollRef: null,
        updateTime: 0,
        options: [],
        userCount: 0
    };

    componentDidMount() {

        const pollId = this.props.match.params.id;

        if (pollId) {
            const ref = PollProvider.load(pollId, this.update);
            const options = restaurants.map(restaurant => {
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
        if (this.state.pollRef) {
            this.state.pollRef.off();
        }
    }

    update = (results, userCount) => {
        const options = this.state.options.map(option => {
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

    vote(options) {
        const votes = options.map(option => option.id);
        PollProvider.update(this.state.pollId, { votes })
    }

    handleSelection = (id) => {
        const options = this.state.options.filter(option => option.id === id ? !option.selected : option.selected);
        this.vote(options);
    };

    handleNameChange = () => {
        const options = this.state.options.filter(option => option.selected);
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

export default PollCard;
