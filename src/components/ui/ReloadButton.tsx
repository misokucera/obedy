import React, {Component} from 'react';
import {MdRefresh} from "react-icons/md/";
import styles from "./ReloadButton.module.css";

type Props = {
    active: boolean,
    onReload: () => void
}

export default class ReloadButton extends Component<Props, {}> {
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