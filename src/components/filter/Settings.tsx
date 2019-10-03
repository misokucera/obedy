import React, {Component} from 'react';
import {MdSettings} from "react-icons/md";
import styles from "./Settings.module.css";
import UserNameInput from "./UserNameInput";

type Props = {}

type State = {
    isClosed: boolean
}

class Settings extends Component<Props, State> {

    state = {
        isClosed: true
    };

    togglePopup = () =>{
        this.setState({
            isClosed: !this.state.isClosed
        })
    };

    render() {

        const popup = (
            <div className={styles['popup']}>
                <h2>Nastavenia</h2>
                <UserNameInput />
            </div>
        );

        return (
            <div className={styles['settings']}>
                <div className={styles['icon']}>
                    <MdSettings onClick={this.togglePopup} />
                </div>
                {!this.state.isClosed && popup}
            </div>
        );
    }
}

export default Settings;