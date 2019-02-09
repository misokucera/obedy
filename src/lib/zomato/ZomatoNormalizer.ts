import stopWords from "./stop-words.json";
import {DailyMenu, Dish} from "../restaurant";

export default class ZomatoNormalizer {

    static normalizeDailyMenu(dailyMenuData: any): DailyMenu {
        let dishes: Dish[] = [];

        if (dailyMenuData.status === 'success') {
            dishes = ZomatoNormalizer.extractDishes(dailyMenuData);
            dishes = ZomatoNormalizer.removeStopWords(dishes, stopWords);
            dishes = ZomatoNormalizer.mergeMultiLineDishes(dishes);
        }

        return {
            updateTime: Date.now(),
            dishes: dishes
        };
    }

    static extractDishes(data: any): Dish[] {
        const dishesPerMenu: Dish[] = data.daily_menus.map((item: any) => item.daily_menu.dishes.map(ZomatoNormalizer.simplifyDish));
        return dishesPerMenu.reduce((acc: Dish[], value: Dish) => acc.concat(value), []);
    }

    static simplifyDish(data: any): Dish {
        return {
            id: data.dish.dish_id,
            name: data.dish.name,
            price: data.dish.price
        }
    }

    static removeStopWords(dishes: Dish[], stopWords: string[]): Dish[] {
        const regex = new RegExp(stopWords.join('|'), 'i');
        return dishes.filter(dish => !dish.name.match(regex));
    }

    static mergeMultiLineDishes(dishes: Dish[]): Dish[] {
        dishes.forEach((dish, index) => {
            if (!dish.price && dishes[index+1]) {
                dishes[index+1].name = dish.name + ' ' + dishes[index+1].name;
            }
        });
        return dishes.filter(dish => dish.price);
    }

}