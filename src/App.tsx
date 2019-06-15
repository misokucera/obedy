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

    normalize(value: string): string {
        return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    filterRestaurants(restaurants: Restaurant[]): Restaurant[] {
        const regex = new RegExp(this.normalize(this.state.filter.text), 'i');

        return restaurants.filter((restaurant: Restaurant) => {
            const name = this.normalize(restaurant.name);
            return name.search(regex) >= 0;
        })
    }

    render() {
        const activeRestaurants = this.filterRestaurants(this.state.restaurants);

        return (
            <Router>
                <div>
                    <Filter restaurants={this.state.restaurants} filter={this.state.filter} onChange={this.handleFilterChange}/>
                    <Switch>
                        <Route
                            path={`/poll/:id`}
                            render={(props) =>
                                <VotingPage key={props.match.params.id} pollId={props.match.params.id} restaurants={activeRestaurants} filter={this.state.filter}/>
                            }
                        />
                        <Route
                            path={`/`}
                            render={(props) =>
                                <VotingPage key={props.match.params.id} pollId={props.match.params.id} restaurants={activeRestaurants} filter={this.state.filter}/>
                            }
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
