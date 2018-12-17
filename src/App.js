import React, {Component} from 'react';
import RestaurantList from "./components/RestaurantList";
import Filter from "./components/Filter";
import styles from "./App.module.css";
import restaurants from "./restaurants"
import RestaurantProvider from "./lib/RestaurantProvider";

const storageRestaurantsKey = 'restaurants';
const storageFilterKey = 'filter';

const defaultFilter = {
    showOnlyMainCourse: true
};

class App extends Component {

    state = {
        restaurants: restaurants || [],
        filter: defaultFilter
    };

    componentDidMount() {
        this.setState({
            restaurants: this.initRestaurants(this.state.restaurants),
            filter: this.loadFilterState()
        }, () => {
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
        const savedSelection = localStorage.getItem(storageRestaurantsKey) || [];
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
            </div>
        );
    }
}

export default App;
