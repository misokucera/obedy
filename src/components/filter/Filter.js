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

    render() {
        const options = this.props.restaurants.map((item, index) => {
            return (
                <FilterOption
                    key={index}
                    id={index}
                    name={item.name}
                    selected={item.selected}
                    color={item.color}
                    onChange={this.props.onChange}>
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
                        <FilterCheckbox checked={this.props.filter.showOnlyMainCourse} onChecked={this.props.onOnlyMainCourseSelected}>
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
