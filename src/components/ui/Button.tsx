import React, {Component} from 'react';
import styles from './Button.module.css';

type Props = {
    onClick?: () => void
}

class Button extends Component<Props, {}> {
    render() {
        return (
            <button className={styles['button']} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;