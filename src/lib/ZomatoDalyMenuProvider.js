import config from "./../zomato.config";

const menuApiUrl = config.api.url + 'dailymenu';

class ZomatoDalyMenuProvider {
    static fetchForRestaurants(restaurants, callback) {
        restaurants.forEach(restaurant => {
            fetch(menuApiUrl + '?res_id=' + restaurant.id, {
                method: 'GET',
                headers: { 'user-key': config.api.key }
            })
                .then(response => response.json())
                .then(json => callback({ ...restaurant, dailyMenus: json['daily_menus'] }));
        })
    }
}

export default ZomatoDalyMenuProvider;