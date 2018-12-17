import React, {Component} from 'react';
import {MdCheckBox, MdCheckBoxOutlineBlank} from "react-icons/md";
import styles from "./FilterCheckbox.module.css";

class FilterCheckbox extends Component {
    render() {
        const icon = this.props.checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>;

        return (
            <label onClick={this.props.onChecked} className={styles['label']}>
                {icon}
                {this.props.children}
            </label>
        );
    }
}

export default FilterCheckbox;
