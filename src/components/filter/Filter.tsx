import React, {Component} from 'react';
import styles from "./Filter.module.css";
import FilterOption from "./FilterOption";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import FilterCheckbox from "./FilterCheckbox";
import {FilterState} from "../../lib/FilterProvider";
import {Restaurant} from "../../lib/restaurant";
import FilterSearch from "./FilterSearch";

type Props = {
    filter: FilterState,
    onChange: (filter: FilterState) => void,
    restaurants: Restaurant[]
}

type State = {
    isCollapsed: boolean
}

export default class Filter extends Component<Props, State> {

    state = {
        isCollapsed: true
    };

    handleCollapseClick = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    };

    handleCheck = () => {
        const filter = {
            ...this.props.filter,
            showOnlyMainCourse: !this.props.filter.showOnlyMainCourse
        };

        this.props.onChange(filter);
    };

    handleSelection = (id: string) => {
        let activeRestaurants = [...this.props.filter.activeRestaurants];
        const index = activeRestaurants.indexOf(id);

        if (index >= 0) {
            activeRestaurants.splice(index, 1);
        } else {
            activeRestaurants.push(id);
        }

        const filter = {
            ...this.props.filter,
            activeRestaurants: activeRestaurants
        };

        this.props.onChange(filter);
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

    render() {
        const options = this.props.restaurants.map((item, index) => {
            return (
                <FilterOption
                    key={index}
                    id={item.id}
                    name={item.name}
                    selected={this.props.filter.activeRestaurants.indexOf(item.id) >= 0}
                    color={item.color}
                    onChange={this.handleSelection}>
                </FilterOption>
            )});

        const expandIcon = this.state.isCollapsed ? <MdExpandMore/> : <MdExpandLess/>;
        const classes = [styles['filter']];

        if (this.state.isCollapsed) {
            classes.push(styles['is-collapsed']);
        }

        return (
            <div className={classes.join(' ')}>
                <div className={styles['content']}>
                    <div className={styles['block']}>
                        <h2>Reštaurácie</h2>
                        {options}
                    </div>
                    <div className={styles['block']}>
                        <FilterSearch searched={this.handleSearch} />
                    </div>
                    <div className={styles['block']}>
                        <h2>Možnosti</h2>
                        <FilterCheckbox checked={this.props.filter.showOnlyMainCourse} onChecked={this.handleCheck}>
                            Iba hlavné jedlá
                        </FilterCheckbox>
                    </div>
                </div>
                <div className={styles['collapse-button']} onClick={this.handleCollapseClick}>
                    Filter {expandIcon}
                </div>
            </div>
        );
    }
}