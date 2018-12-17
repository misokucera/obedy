import React, {Component} from 'react';
import styles from "./CardFooter.module.css";

class CardFooter extends Component {
    render() {
        return (
            <div className={styles['info']}>
                {this.props.children}
            </div>
        );
    }
}

export default CardFooter;
