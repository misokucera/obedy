import React, {Component} from 'react';
import styles from "./Chart.module.css";
import {MdAccountCircle} from "react-icons/md/";
import ReactTooltip from "react-tooltip";

class Chart extends Component {

    getTotalCount(data) {
        return data.reduce((acc, item) => acc + item.value, 0);
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

            const users = item.users.map((userName, index) => {
                return (
                    <span data-tip={userName || 'anonymný'} key={index}>
                        <MdAccountCircle/>
                        <ReactTooltip effect="solid"/>
                    </span>
                );
            });

            return (
                <div className={classes.join(' ')} key={item.id} onClick={() => this.props.onSelectionChange(item.id)}>
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

export default Chart;
