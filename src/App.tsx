import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {FilterState} from "./lib/FilterProvider";
import FilterProvider from "./lib/FilterProvider";
import {Restaurant} from "./lib/restaurant";
import restaurants from "./restaurants.json"
import Filter from "./components/filter/Filter";
import {Switch} from "react-router";
import VotingPage from "./components/VotingPage";
import ListPage from "./components/ListPage";

type State = {
    restaurants: Restaurant[],
    filter: FilterState
}

class App extends Component<{}, State> {

    state = {
        restaurants: restaurants || [],
        filter: FilterProvider.load()
    };

    handleFilterChange = (filter: FilterState) => {
        this.setState({ filter }, () => FilterProvider.save(filter));
    };

    render() {
        const activeRestaurants = this.state.restaurants.filter(item => this.state.filter.activeRestaurants.indexOf(item.id) >= 0);

        return (
            <Router>
                <div>
                    <Filter restaurants={this.state.restaurants} filter={this.state.filter} onChange={this.handleFilterChange}/>
                    <Switch>
                        <Route
                            path={`/poll/:id`}
                            render={(props) =>
                                <VotingPage pollId={props.match.params.id} restaurants={activeRestaurants} filter={this.state.filter}/>
                            }
                        />
                        <Route
                            path={`/`}
                            render={(props) =>
                                <ListPage restaurants={activeRestaurants} filter={this.state.filter} />
                            }
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
