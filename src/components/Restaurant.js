import React, {Component} from 'react';
import DailyMenu from "./DailyMenu";
import styles from "./Restaurant.module.css";

class Restaurant extends Component {

    render() {
        const dailyMenus = this.props.dailyMenus.map(item => {
            const dailyMenu = item.daily_menu;
            return <DailyMenu key={dailyMenu.daily_menu_id} name={dailyMenu.name} dishes={dailyMenu.dishes}/>
        });

        const content = dailyMenus.length ? dailyMenus : 'Reštaurácia dnes denné menu nezverejnila';

        return (
            <div className={styles['restuarant']}>
                <h2>{this.props.name}</h2>
                <div>{content}</div>
            </div>
        );
    }
}

export default Restaurant;
