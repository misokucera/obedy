const stopWords = [
    '^POLÉVKA$',
    'HLAVNÍ JÍDLA',
    'DNES PO DOBU',
    'S MOŽNOSTÍ ZAKOUPENÍ',
    'SALÁTY a MALÁ LEHKÁ JÍDLA',
    'Informaci o alergenech',
    'Dle denní nabídky',
    '^menu$',
    '^SALÁT$',
    '^SPECIALITA$',
    '^Specialita dne$',
    '^DEZERT$',
    '^HLAVNÍ CHOD$',
    '^Bezmasé jídlo$',
    '^Stálá nabídka$',
    '^NÁPOJ K POLEDNÍMU MENU$'
];

class ZomatoNormalizer {

    static normalizeDailyMenu(data) {
        const dishesPerMenu = data.daily_menus.map(item => item.daily_menu.dishes.map(ZomatoNormalizer.normalizeDish));
        let dishes = dishesPerMenu.reduce((acc, value) => acc.concat(value), []);

        dishes = ZomatoNormalizer.removeStopWords(dishes, stopWords);
        dishes = ZomatoNormalizer.mergeMultiLineDishes(dishes);

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