import React, {Component} from 'react';
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
import {Dish as DishType, DailyMenu} from "../lib/restaurant";
import {FilterState} from "../lib/FilterProvider";
import Dish from "./Dish";
import styles from "./RestaurantCard.module.css";

const mainCoursePriceThreshold = 75;
const emptyMessage = 'Reštaurácia dnes denné menu nezverejnila';
const defaultColor = '#999999';

type Props = {
    id: string,
    name: string,
    source: string,
    color: string,
    url: string,
    selectable: boolean,
    selected: boolean,
    onSelection?: (id: string) => void,
    filter: FilterState
}

type State = {
    dishes: DishType[],
    updateTime: number
}

export default class RestaurantCard extends Component<Props, State> {

    state = {
        dishes: [],
        updateTime: 0
    };

    componentDidMount() {
        this.loadDailyMenu();
    }

    loadDailyMenu(useCache = true) {
        RestaurantProvider.getDailyMenu(this.props.id, this.props.source, useCache)
            .then((dailyMenu: DailyMenu) => {
                this.setState({
                    updateTime: dailyMenu.updateTime,
                    dishes: dailyMenu.dishes || []
                });
            });
    }

    handleReload = () => {
        this.setState({
            updateTime: 0
        }, () => this.loadDailyMenu(false));
    };

    filterDishes(dishes: DishType[], filter: FilterState) {
        if (filter.showOnlyMainCourse) {
            return dishes.filter(dish => parseInt(dish.price) > mainCoursePriceThreshold);
        }

        return dishes;
    }

    renderDishes(dishes: DishType[]) {
        if (dishes.length) {
            return dishes.map(dish => {
                return <Dish key={dish.id} name={dish.name} price={dish.price}/>
            });
        }

        return emptyMessage;
    }

    handleSelection = () => {
        if (this.props.onSelection) {
            this.props.onSelection(this.props.id);
        }
    };

    render() {
        const dishes = this.filterDishes(this.state.dishes, this.props.filter);
        const content = this.state.updateTime ? this.renderDishes(dishes) : <TextPlaceholder/>;
        const color = this.props.selectable && !this.props.selected ? '' : this.props.color;
        const classes = this.props.selectable ? styles['selectable'] : '';
        const selectionStyle = this.props.selectable && !this.props.selected ? { color: defaultColor } : {};

        return (
            <div className={classes} style={selectionStyle}>
                <Card>
                    <CardHeader>
                        <div className={styles['header']} onClick={this.handleSelection}>
                            <Avatar background={color}>{this.props.name[0] || ''}</Avatar>
                            <h2>{this.props.name}</h2>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {content}
                    </CardContent>
                    <CardFooter>
                        <Label url={this.props.url}>{this.props.source}</Label>
                        <DateTime timestamp={this.state.updateTime}/>
                        <ReloadButton active={this.state.updateTime > 0} onReload={this.handleReload} />
                    </CardFooter>
                </Card>
            </div>
        );
    }
}