import stopWords from "./stop-words";

class ZomatoNormalizer {

    static normalizeDailyMenu(dailyMenuData) {
        let dishes = [];

        dishes = ZomatoNormalizer.extractDishes(dailyMenuData);
        dishes = ZomatoNormalizer.removeStopWords(dishes, stopWords);
        dishes = ZomatoNormalizer.mergeMultiLineDishes(dishes);

        return {
            updateTime: Date.now(),
            dishes: dishes
        };
    }

    static extractDishes(data) {
        const dishesPerMenu = data.daily_menus.map(item => item.daily_menu.dishes.map(ZomatoNormalizer.simplifyDish));
        return dishesPerMenu.reduce((acc, value) => acc.concat(value), []);
    }

    static simplifyDish(data) {
        return {
            id: data.dish.dish_id,
            name: data.dish.name,
            price: data.dish.price
        }
    }

    static removeStopWords(dishes, stopWords) {
        const regex = new RegExp(stopWords.join('|'), 'i');
        return dishes.filter(dish => !dish.name.match(regex));
    }

    static mergeMultiLineDishes(dishes) {
        dishes.forEach((dish, index) => {
            if (!dish.price && dishes[index+1]) {
                dishes[index+1].name = dish.name + ' ' + dishes[index+1].name;
            }
        });
        return dishes.filter(dish => dish.price);
    }

}

export default ZomatoNormalizer;