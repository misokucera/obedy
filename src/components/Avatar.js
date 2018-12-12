import React, {Component} from 'react';
import styles from "./Avatar.module.css";

class Avatar extends Component {
    render() {
        return (
            <div className={styles['avatar']} style={{ background: this.props.background }}>
                {this.props.children}
            </div>
        );
    }
}

export default Avatar;
