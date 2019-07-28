import React, {Component, FormEvent} from 'react';
import ActiveUser from "../../lib/ActiveUser";
import styles from "./UserNameInput.module.css";
import {MdCheck} from "react-icons/md";
import {MdAccountCircle} from "react-icons/md/";

const placeholder = 'meno';

type Props = {
    nameChanged?: () => void
}

type State = {
    name: string,
    timer: number,
    saved: boolean
}

export default class UserNameInput extends Component<Props, State> {

    state = {
        name: '',
        timer: 0,
        saved: false
    };

    componentDidMount() {
        this.setState({
            name: ActiveUser.getName() || ''
        });
    }

    handleChange = (event: FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value;

        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }

        const timer = window.setTimeout(() => this.save(name), 1000);

        this.setState({ name, timer, saved: false }, () => {
            ActiveUser.setName(name);
        });
    };

    save(name: string) {
        const timer = window.setTimeout(() => this.hideIcon(), 5000);

        if (this.props.nameChanged) {
            this.props.nameChanged()
        }

        this.setState({ saved: true, timer });
    }

    hideIcon() {
        this.setState({ saved: false });
    }

    render() {
        return (
            <div className={styles['user-name']}>
                <input type="text" placeholder={placeholder} value={this.state.name} onChange={this.handleChange}/>
                {this.state.saved &&
                    <span className={styles['save-icon']}>
                        <MdCheck/>
                    </span>
                }
                <span className={styles['user-icon']}>
                    <MdAccountCircle />
                </span>
            </div>
        );
    }
}
