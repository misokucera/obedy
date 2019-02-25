import React, {Component} from 'react';
import styles from "./Avatar.module.css";

type Props = {
    background: string
}

export default class Avatar extends Component<Props, {}> {
    render() {
        return (
            <div className={styles['avatar']} style={{ background: this.props.background }}>
                {this.props.children}
            </div>
        );
    }
}
