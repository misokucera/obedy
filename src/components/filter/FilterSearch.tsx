import React, {Component, FormEvent} from 'react';
import styles from "./FilterSearch.module.css";
import ActiveUser from "../../lib/ActiveUser";

const placeholder = 'hľadať';

type Props = {
    searched: (value: string) => void
}

type State = {
    value: string,
    timer: number
}

export default class FilterSearch extends Component<Props, State> {

    state = {
        value: '',
        timer: 0
    };

    handleChange = (event: FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }

        const timer = window.setTimeout(() => this.filter(value), 500);

        this.setState({ value, timer });
    };

    filter(value: string) {
        this.props.searched(value);
    }

    render() {
        return (
            <input type="text" placeholder={placeholder} value={this.state.value} onChange={this.handleChange} maxLength={100}/>
        );
    }
}
