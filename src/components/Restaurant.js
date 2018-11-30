import React, {Component} from 'react';
import DailyMenu from "./DailyMenu";
import styles from "./Restaurant.module.css";
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md"

class Restaurant extends Component {
    state = {
        isCollapsed: false
    };

    handleClick = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    };

    render() {
        const dailyMenus = this.props.dailyMenus.map(item => {
            const dailyMenu = item.daily_menu;
            return <DailyMenu key={dailyMenu.daily_menu_id} name={dailyMenu.name} dishes={dailyMenu.dishes}/>
        });

        const icon = this.state.isCollapsed ? <MdArrowDropUp/> : <MdArrowDropDown/>;

        return (
            <div className={styles['restuarant']}>
                <h2 onClick={this.handleClick}>{icon}{this.props.name}</h2>
                {!this.state.isCollapsed &&
                    <div>{dailyMenus}</div>
                }
            </div>
        );
    }
}

export default Restaurant;
