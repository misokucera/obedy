import React, {Component} from 'react';
import styles from "./Filter.module.css";
import FilterOption from "./FilterOption";

class Filter extends Component {

    render() {
        const options = this.props.restaurants.map((item, index) => {
            return (
                <FilterOption
                    key={index}
                    id={index}
                    name={item.name}
                    selected={item.selected}
                    onChange={this.props.onChange}>
                </FilterOption>
            )});

        return (
            <div className={styles['filter']}>
                <h2>Reštaurácie</h2>
                {options}
            </div>
        );
    }
}

export default Filter;
