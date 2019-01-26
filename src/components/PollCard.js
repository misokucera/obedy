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
                    selected: false
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
                selected: result.selected || false
            }
        });

        this.setState({ options, userCount, updateTime: Date.now() });
    };

    handleSelection = (id) => {
        const votes = this.state.options
            .filter(option => option.id === id ? !option.selected : option.selected)
            .map(option => option.id);

        PollProvider.update(this.state.pollId, { votes })
    };

    render() {
        const content = this.state.updateTime
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

export default PollCard;
