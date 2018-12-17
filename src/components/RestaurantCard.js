import React, {Component} from 'react';
import Dish from "./Dish";
import CardHeader from "./card/CardHeader";
import CardContent from "./card/CardContent";
import CardFooter from "./card/CardFooter";
import Label from "./Label";
import DateTime from "./DateTime";
import Avatar from "./Avatar";
import Card from "./card/Card";

const mainCoursePriceThreshold = 75;
const emptyMessage = 'Reštaurácia dnes denné menu nezverejnila';

class RestaurantCard extends Component {

    filterDishes(dishes, filter) {
        if (filter.showOnlyMainCourse) {
            return dishes.filter(dish => parseInt(dish.price) > mainCoursePriceThreshold);
        }

        return dishes;
    }

    renderDishes(dishes) {
        if (dishes.length) {
            return dishes.map(dish => {
                return <Dish key={dish.id} name={dish.name} price={dish.price}/>
            });
        }

        return emptyMessage;
    }

    render() {
        const data = this.props.data;
        const dishes = this.filterDishes(data.dishes, this.props.filter);

        return (
            <Card>
                <CardHeader>
                    <Avatar background={data.color}>{data.name[0] || ''}</Avatar>
                    <h2>{data.name}</h2>
                </CardHeader>
                <CardContent isReady={data.updatedTime}>
                    {this.renderDishes(dishes)}
                </CardContent>
                <CardFooter>
                    <Label url={data.url}>{data.source}</Label>
                    <DateTime timestamp={data.updatedTime}/>
                </CardFooter>
            </Card>
        );
    }
}

export default RestaurantCard;