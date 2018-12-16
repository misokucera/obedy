import React, {Component} from 'react';
import styles from "./Restaurant.module.css";
import Dish from "./Dish";
import Avatar from "./Avatar";
import DateTime from "./DateTime";
import Label from "./Label";
import TextPlaceholder from "./TextPlaceholder";
import AnimateHeight from 'react-animate-height';

const mainCoursePriceThreshold = 75;

class Restaurant extends Component {
    state = {
        height: 'auto'
    };

    componentDidMount() {
        this.setState({
            height: this.placeholder.scrollHeight
        });
    }

    componentDidUpdate() {
        if (this.state.height !== this.placeholder.scrollHeight) {
            this.setState({
                height: this.placeholder.scrollHeight
            });
        }
    }

    render() {
        let dishes = this.props.dishes;

        if (this.props.showOnlyMainCourse) {
            dishes = this.props.dishes.filter(dish => parseInt(dish.price) > mainCoursePriceThreshold);
        }

        dishes = dishes.map(dish => {
            return <Dish key={dish.id} name={dish.name} price={dish.price}/>
        });

        const content = dishes.length ? dishes : 'Reštaurácia dnes denné menu nezverejnila';

        return (
            <div className={styles['restaurant']}>
                <div className={styles['header']}>
                    <Avatar background={this.props.color}>{this.props.name[0] || ''}</Avatar>
                    <h2>{this.props.name}</h2>
                </div>
                <div className={styles['content']}>
                    <AnimateHeight duration={500} height={this.state.height}>
                        <div ref={placeholder => this.placeholder = placeholder}>
                            {this.props.updated
                                ? <div>
                                    {content}
                                    <div className={styles['info']}>
                                        {this.props.source && <Label url={this.props.url}>{this.props.source}</Label>}
                                        <DateTime class={styles['date']} timestamp={this.props.updated}/>
                                    </div>
                                  </div>
                                : <TextPlaceholder/>
                            }
                        </div>
                    </AnimateHeight>
                 </div>
            </div>
        );
    }
}

export default Restaurant;
