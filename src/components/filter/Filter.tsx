import React, {Component} from 'react';
import {Restaurant} from "../../lib/restaurant";
import FilterSearch from "./FilterSearch";
import {FilterState} from "../../lib/FilterProvider";
import styles from "./Filter.module.css";
import FilterCheckbox from "./FilterCheckbox";
import UserNameInput from "./UserNameInput";

type Props = {
    restaurants: Restaurant[],
    filter: FilterState,
    onChange: (filter: FilterState) => void
}

export default class Filter extends Component<Props, {}> {

    handleSearch = (text: string) => {
        const filter = {
            ...this.props.filter,
            text: text
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
                        <div className={styles['item-grow']}>
                            <FilterCheckbox checked={this.props.filter.showOnlyMainCourse} onChecked={this.handleCheck}>
                                Iba hlavné jedlá
                            </FilterCheckbox>
                        </div>
                        <div className={styles['item']}>
                            <UserNameInput/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}