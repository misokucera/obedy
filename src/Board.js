import React, {Component} from 'react';
import RestaurantList from "./components/RestaurantList";
import styles from "./Board.module.css";
import restaurants from "./restaurants"
import PollCard from "./components/PollCard";
import {Route} from "react-router-dom";
import FilterProvider from "./lib/FilterProvider";
import Filter from "./components/filter/Filter";

class Board extends Component {

    state = {
        restaurants: restaurants || [],
        filter: FilterProvider.load()
    };

    handleFilterChange = (filter) => {
        this.setState({ filter }, FilterProvider.save(filter));
    };

    render() {
        const activeRestaurants = this.state.restaurants.filter(item => this.state.filter.activeRestaurants.indexOf(item.id) >= 0);

        return (
            <div className={styles['layout']}>
                <Filter restaurants={this.state.restaurants} filter={this.state.filter} onChange={this.handleFilterChange}/>
                <div className={styles['content']}>
                    <RestaurantList restaurants={activeRestaurants} filter={this.state.filter}/>
                    <Route path={`/poll/:id`} component={PollCard}/>
                </div>
            </div>
        );
    }
}

export default Board;
