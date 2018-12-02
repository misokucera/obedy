import React, {Component} from 'react';
import styles from "./Filter.module.css";
import FilterOption from "./FilterOption";
import {MdExpandLess, MdExpandMore} from "react-icons/md"

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
                    onChange={this.props.onChange}>
                </FilterOption>
            )});

        const icon = this.state.isCollapsed ? <MdExpandMore/> : <MdExpandLess/>;
        const classes = [styles['filter']];

        if (this.state.isCollapsed) {
            classes.push(styles['is-collapsed']);
        }

        return (
            <div className={classes.join(' ')}>
                <div className={styles['content']}>
                    <h2>Reštaurácie</h2>
                    {options}
                </div>
                <div className={styles['collapse-button']} onClick={this.handleCollapseClick}>
                    Filter {icon}
                </div>
            </div>
        );
    }
}

export default Filter;
