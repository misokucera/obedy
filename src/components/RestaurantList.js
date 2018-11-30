import React, {Component} from 'react';
import Restaurant from "./Restaurant";

class RestaurantList extends Component {
    render() {
        const restaurants = this.props.restaurants
            .filter(item => item.selected)
            .map(restaurant => <Restaurant key={restaurant.id} name={restaurant.name} dailyMenus={restaurant.dailyMenus}/>);

        return (
            <div> {restaurants} </div>
        );
    }
}

export default RestaurantList;
