import React, {Component} from 'react';
import styles from "./Label.module.css";

type Props = {
    url: string
}

export default class Label extends Component<Props, {}> {
    render() {
        const classes = [styles['label']];

        if (this.props.url) {
            classes.push(styles['link']);
        }

        return (
            <a href={this.props.url}
               className={classes.join(' ')}
               target="_blank"
               rel="noopener noreferrer"
            >
                {this.props.children}
            </a>
        );
    }
}