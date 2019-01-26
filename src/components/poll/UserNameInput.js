import React, {Component} from 'react';
import User from "../../lib/User";
import styles from "./UserNameInput.module.css";
import {MdCheck} from "react-icons/md";

const placeholder = 'meno';

class UserNameInput extends Component {

    state = {
        name: '',
        timer: null,
        saved: false
    };

    componentDidMount() {
        this.setState({
            name: User.getName() || ''
        });
    }

    handleChange = (event) => {
        const name = event.target.value;

        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }

        const timer = setTimeout(() => this.save(name), 1000);

        this.setState({ name, timer, saved: false }, () => {
            User.setName(name);
        });
    };

    save(name) {
        const timer = setTimeout(() => this.hideIcon(), 5000);

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
            </div>
        );
    }
}

export default UserNameInput;
