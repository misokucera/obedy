import React, {Component} from 'react';
import RestaurantList from "./components/RestaurantList";
import Filter from "./components/Filter";
import styles from "./App.module.css";
import restaurants from "./restaurants"
import ZomatoDailyMenuProvider from "./lib/ZomatoDalyMenuProvider";

const storageSelectionKey = 'selected';

class App extends Component {
    state = {
        restaurants: []
    };

    componentDidMount() {
        const savedSelection = localStorage.getItem(storageSelectionKey) || [];

        ZomatoDailyMenuProvider.fetchForRestaurants(restaurants, (restaurant) => {

            const restaurants = [...this.state.restaurants, {
                ...restaurant,
                selected: savedSelection.indexOf(restaurant.id) > -1
            }];

            restaurants.sort((a, b) => a.order - b.order);

            this.setState({ restaurants });
        });
    }

    handleSelection = (index) => {
        const restaurants = this.state.restaurants.slice();
        restaurants[index].selected = !restaurants[index].selected;

        this.setState({ restaurants }, this.updateSavedSelection);
    };

    updateSavedSelection = () => {
        const selectedRestaurants = this.state.restaurants
            .filter(item => item.selected)
            .map(item => item.id);

        localStorage.setItem(storageSelectionKey, JSON.stringify(selectedRestaurants));
    };

    render() {
        return (
            <div className={styles['layout']}>
                <Filter restaurants={this.state.restaurants} onChange={this.handleSelection}/>
                <RestaurantList restaurants={this.state.restaurants}/>
            </div>
        );
    }
}

export default App;
