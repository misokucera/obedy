import React, {Component} from 'react';
import styles from "./FilterOption.module.css";

class FilterOption extends Component {
    render() {
        const classes = [styles['option']];

        if (this.props.selected) {
            classes.push(styles['selected']);
        }

        return (
            <p className={classes.join(' ')} onClick={() => this.props.onChange(this.props.id)}>
                <span>{this.props.name}</span>
            </p>
        );
    }
}

export default FilterOption;
