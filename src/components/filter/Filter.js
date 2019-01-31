import React, {Component} from 'react';
import styles from "./Filter.module.css";
import FilterOption from "./FilterOption";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import FilterCheckbox from "./FilterCheckbox";

class Filter extends Component {

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

    handleSelection = (id) => {
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

export default Filter;
