import Database from "./Database";
import ZomatoApi from "./zomato/ZomatoApi";

const cacheInterval = 15 * 60 * 1000;

class RestaurantProvider {
    static getDailyMenu(restaurantId, source, useCache = true) {
        if (!useCache) {
            return RestaurantProvider.getDailyMenuFromApi(restaurantId, source);
        }

        return Database.get('restaurants/' + restaurantId).then(value => {
            if (!value || value.updateTime < Date.now() - cacheInterval) {
                return RestaurantProvider.getDailyMenuFromApi(restaurantId, source);
            } else {
                return Promise.resolve(value);
            }
        });
    }

    static getDailyMenuFromApi(restaurantId, source) {
        if (source === 'zomato') {
            return ZomatoApi.getDailyMenu(restaurantId)
                .then(data => {
                    Database.set('restaurants/' + restaurantId, data);
                    return data;
                });
        } else {
            return Promise.resolve({
                updateTime: Date.now(),
                dishes: []
            })
        }
    }
}

export default RestaurantProvider;