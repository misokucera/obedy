import React, {Component} from 'react';
import {MdCheckBox, MdCheckBoxOutlineBlank} from "react-icons/md";
import styles from "./FilterCheckbox.module.css";

type Props = {
    checked: boolean,
    onChecked: () => void
}

export default class FilterCheckbox extends Component<Props, {}> {
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