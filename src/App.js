import React, {Component} from 'react';
import RestaurantList from "./components/RestaurantList";
import Filter from "./components/Filter";
import styles from "./App.module.css";
import restaurants from "./restaurants"
import RestaurantProvider from "./lib/RestaurantProvider";

const storageSelectionKey = 'selected';

class App extends Component {

    state = {
        restaurants: restaurants || [],
        showOnlyMainCourse: true
    };

    componentDidMount() {

        const restaurants = this.initRestaurants(this.state.restaurants);

        this.setState({ restaurants }, () => {
            this.state.restaurants.map((restaurant, index) => {
                return RestaurantProvider.getDailyMenu(restaurant.id, restaurant.source)
                    .then(dailyMenu => {
                        const restaurants = this.state.restaurants.slice();
                        restaurants[index] = {
                            ...restaurant,
                            ...dailyMenu
                        };
                        this.setState({ restaurants });
                    });
            });
        });
    }

    initRestaurants(restaurants) {
        const savedSelection = localStorage.getItem(storageSelectionKey) || [];
        restaurants = restaurants.slice();

        return restaurants.map(restaurant => {
            return {
                ...restaurant,
                updatedTime: 0,
                dishes: [],
                selected: savedSelection.indexOf(restaurant.id) > -1
            }
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
                <RestaurantList restaurants={this.state.restaurants} showOnlyMainCourse={this.state.showOnlyMainCourse}/>
            </div>
        );
    }
}

export default App;
