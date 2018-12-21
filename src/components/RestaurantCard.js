import React, {Component} from 'react';
import Dish from "./Dish";
import CardHeader from "./card/CardHeader";
import CardContent from "./card/CardContent";
import CardFooter from "./card/CardFooter";
import Label from "./ui/Label";
import DateTime from "./ui/DateTime";
import Avatar from "./ui/Avatar";
import Card from "./card/Card";
import TextPlaceholder from "./ui/TextPlaceholder";
import RestaurantProvider from "../lib/RestaurantProvider";
import ReloadButton from "./ui/ReloadButton";

const mainCoursePriceThreshold = 75;
const emptyMessage = 'Reštaurácia dnes denné menu nezverejnila';

class RestaurantCard extends Component {

    state = {
        dishes: [],
        updateTime: 0
    };

    componentDidMount() {
        this.loadDailyMenu();
    }

    loadDailyMenu() {
        RestaurantProvider.getDailyMenu(this.props.id, this.props.source)
            .then(dailyMenu => {
                this.setState({
                    updateTime: dailyMenu.updateTime,
                    dishes: dailyMenu.dishes
                });
            });
    }

    handleReload = () => {
        this.setState({
            updateTime: 0
        }, this.loadDailyMenu);
    };

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
        const dishes = this.filterDishes(this.state.dishes, this.props.filter);

        return (
            <Card>
                <CardHeader>
                    <Avatar background={this.props.color}>{this.props.name[0] || ''}</Avatar>
                    <h2>{this.props.name}</h2>
                </CardHeader>
                <CardContent ready={this.state.updateTime} placeholder={<TextPlaceholder/>}>
                    {this.renderDishes(dishes)}
                </CardContent>
                <CardFooter>
                    <Label url={this.props.url}>{this.props.source}</Label>
                    <DateTime timestamp={this.state.updateTime}/>
                    <ReloadButton active={this.state.updateTime} onReload={this.handleReload} />
                </CardFooter>
            </Card>
        );
    }
}

export default RestaurantCard;
