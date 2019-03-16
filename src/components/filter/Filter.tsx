import React, {Component} from 'react';
import {Restaurant} from "../../lib/restaurant";
import FilterSearch from "./FilterSearch";
import {FilterState} from "../../lib/FilterProvider";
import styles from "./Filter.module.css";
import FilterCheckbox from "./FilterCheckbox";

type Props = {
    restaurants: Restaurant[],
    filter: FilterState,
    onChange: (filter: FilterState) => void
}

export default class Filter extends Component<Props, {}> {

    state = {
    };

    normalize(value: string): string {
        return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    handleSearch = (value: string) => {
        const regex = new RegExp(this.normalize(value), 'i');
        const activeRestaurants = this.props.restaurants
            .filter((restaurant: Restaurant) => {
                const name = this.normalize(restaurant.name);
                return name.search(regex) >= 0;
            })
            .map((restaurant: Restaurant) => restaurant.id);

        const filter = {
            ...this.props.filter,
            activeRestaurants: activeRestaurants
        };

        this.props.onChange(filter);
    };

    handleCheck = () => {
        const filter = {
            ...this.props.filter,
            showOnlyMainCourse: !this.props.filter.showOnlyMainCourse
        };

        this.props.onChange(filter);
    };

    render() {
        return (
            <div className={styles['filter']}>
                <div className={styles['content']}>
                    <div className={styles['items']}>
                        <div className={styles['item-grow']}>
                            <FilterSearch searched={this.handleSearch}/>
                        </div>
                        <div className={styles['item']}>
                            <FilterCheckbox checked={this.props.filter.showOnlyMainCourse} onChecked={this.handleCheck}>
                                Iba hlavné jedlá
                            </FilterCheckbox>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}