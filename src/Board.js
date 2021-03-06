import React, {Component} from 'react';
import RestaurantList from "./components/RestaurantList";
import Filter from "./components/filter/Filter";
import styles from "./Board.module.css";
import restaurants from "./restaurants"
import PollCard from "./components/PollCard";
import {Route} from "react-router-dom";

const storageRestaurantsKey = 'restaurants';
const storageFilterKey = 'filter';

const defaultFilter = {
    showOnlyMainCourse: true
};

class Board extends Component {

    state = {
        restaurants: restaurants || [],
        filter: defaultFilter
    };

    componentDidMount() {
        this.setState({
            restaurants: this.loadRestaurantSelection(this.state.restaurants),
            filter: this.loadFilterState()
        });
    }

    loadRestaurantSelection(restaurants) {
        const savedSelection = localStorage.getItem(storageRestaurantsKey) || [];

        return restaurants.map(restaurant => {
            return {
                ...restaurant,
                selected: savedSelection.indexOf(restaurant.id) > -1
            }
        });
    }

    loadFilterState() {
        return JSON.parse(localStorage.getItem(storageFilterKey)) || defaultFilter;
    }

    handleRestaurantSelection = (index) => {
        const restaurants = this.state.restaurants.slice();
        restaurants[index].selected = !restaurants[index].selected;

        this.setState({ restaurants }, this.storeRestaurantSelectionState);
    };

    handleOnlyMainCourseSelection = () => {
        this.setState({
            filter: {
                showOnlyMainCourse: !this.state.filter.showOnlyMainCourse
            }
        }, this.storeFilterState);
    };

    storeFilterState() {
        localStorage.setItem(storageFilterKey, JSON.stringify(this.state.filter));
    }

    storeRestaurantSelectionState = () => {
        const selectedRestaurants = this.state.restaurants
            .filter(item => item.selected)
            .map(item => item.id);

        localStorage.setItem(storageRestaurantsKey, JSON.stringify(selectedRestaurants));
    };

    render() {
        return (
            <div className={styles['layout']}>
                <Filter
                    restaurants={this.state.restaurants}
                    onChange={this.handleRestaurantSelection}
                    filter={this.state.filter}
                    onOnlyMainCourseSelected={this.handleOnlyMainCourseSelection}
                />
                <RestaurantList restaurants={this.state.restaurants} filter={this.state.filter}/>
                <Route path={`/poll/:id`} component={PollCard}/>
            </div>
        );
    }
}

export default Board;
