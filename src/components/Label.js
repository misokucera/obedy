import React, {Component} from 'react';
import styles from "./Label.module.css";

class Label extends Component {
    render() {
        const classes = [styles['label']];

        if (this.props.url) {
            classes.push(styles['link']);
        }

        return (
            <a href={this.props.url}
               style={{ background: this.props.color }}
               className={classes.join(' ')}
               target="_blank"
               rel="noopener noreferrer"
            >
                {this.props.children}
            </a>
        );
    }
}

export default Label;
