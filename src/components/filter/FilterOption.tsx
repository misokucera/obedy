import React, {Component} from 'react';
import styles from "./FilterOption.module.css";

type Props = {
    id: string,
    name: string,
    color: string,
    selected: boolean,
    onChange: (id: string) => void
}

export default class FilterOption extends Component<Props, {}> {
    render() {
        const classes = [styles['option']];

        if (this.props.selected) {
            classes.push(styles['selected']);
        }

        const background = this.props.selected ? this.props.color : '';

        return (
            <p className={classes.join(' ')} onClick={() => this.props.onChange(this.props.id)}>
                <span>
                    <i className={styles['dot']} style={{ background: background}}/>
                    {this.props.name}
                </span>
            </p>
        );
    }
}
