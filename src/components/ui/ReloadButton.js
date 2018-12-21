import React, {Component} from 'react';
import {MdRefresh} from "react-icons/md/";
import styles from "./ReloadButton.module.css";

class ReloadButton extends Component {
    render() {
        return (
            this.props.active
                ? <div className={styles['button']}>
                      <MdRefresh onClick={this.props.onReload}/>
                  </div>
                : ''
        );
    }
}

export default ReloadButton;
