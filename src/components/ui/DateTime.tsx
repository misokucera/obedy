import React, {Component} from 'react';
import moment from "moment/moment";
import styles from "./DateTime.module.css";

type Props = {
    timestamp: number
}

export default class DateTime extends Component<Props, {}> {

    format(timestamp: number, format: string) {
        return timestamp ? moment(timestamp).format(format) : '';
    }

    render() {
        const date = this.format(this.props.timestamp, 'D.M.Y');
        const time = this.format(this.props.timestamp, 'HH:mm:ss');

        return (
            <span className={styles['date']}>
                {date && time ? 'Aktualizované ' + date + ' o ' + time : ''}
            </span>
        );
    }
}