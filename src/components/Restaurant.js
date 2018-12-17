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

class Restaurant extends Component {

    render() {
        let dishes = this.props.dishes;

        if (this.props.showOnlyMainCourse) {
            dishes = dishes.filter(dish => parseInt(dish.price) > mainCoursePriceThreshold);
        }

        dishes = dishes.map(dish => {
            return <Dish key={dish.id} name={dish.name} price={dish.price}/>
        });

        const content = dishes.length ? dishes : 'Reštaurácia dnes denné menu nezverejnila';

        return (
            <Card>
                <CardHeader>
                    <Avatar background={this.props.color}>{this.props.name[0] || ''}</Avatar>
                    <h2>{this.props.name}</h2>
                </CardHeader>
                <CardContent isReady={this.props.updated}>
                    {content}
                </CardContent>
                <CardFooter>
                    {this.props.source && <Label url={this.props.url}>{this.props.source}</Label>}
                    <DateTime timestamp={this.props.updated}/>
                </CardFooter>
            </Card>
        );
    }
}

export default Restaurant;
