import React, {Component} from 'react';
import styles from "./CardHeader.module.css";

class CardHeader extends Component<{}, {}> {
    render() {
        return (
            <div className={styles['header']}>
                {this.props.children}
            </div>
        );
    }
}

export default CardHeader;
