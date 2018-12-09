class ZomatoNormalizer {

    static normalizeDailyMenu(data) {
        const dishesPerMenu = data.daily_menus.map(item => item.daily_menu.dishes.map(ZomatoNormalizer.normalizeDish));

        const dishes = dishesPerMenu.reduce((acc, value) => acc.concat(value), []);

        return {
            updatedTime: Date.now(),
            dishes: dishes
        };
    }

    static normalizeDish(data) {
        return {
            id: data.dish.dish_id,
            name: data.dish.name,
            price: data.dish.price
        }
    }

}

export default ZomatoNormalizer;