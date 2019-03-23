import React, {Component} from 'react';
import styles from "./Chart.module.css";
import {MdAccountCircle} from "react-icons/md/";

export type Option = {
    id: string,
    label: string,
    value: number,
    users: string[],
    selected: boolean,
    color: string
}

type Props = {
    options: Option[],
    onSelectionChange?: (id: string) => void
}

export default class Chart extends Component<Props, {}> {

    private getTotalCount(options: Option[]) {
        return options.reduce((acc, item) => acc + item.value, 0);
    }

    render() {
        const options = this.props.options || [];
        const count = this.getTotalCount(options);

        const bars = options.map(item => {
            const width = item.value / count * 100;
            const classes = [styles['option']];

            if (item.selected) {
                classes.push(styles['selected']);
            }

            const users = item.users.map((userName: string, index: number) => {
                return (
                    <span title={userName || 'anonymný'} key={index}>
                        <MdAccountCircle/>
                    </span>
                );
            });

            return (
                <div className={classes.join(' ')} key={item.id}>
                    <label className={styles['label']}>
                        <span>{item.label}</span>
                        <span className={styles['user-icons']}>{users}</span>
                    </label>
                    <div className={styles['result']}>
                        <div className={styles['bar']}>
                            <span className={styles['value']} style={{ width: width + '%', background: item.color }}></span>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className={styles['chart']}>
                {bars}
            </div>
        );
    }
}
