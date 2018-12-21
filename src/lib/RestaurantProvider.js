import FirebaseApi from "./FirebaseApi";
import ZomatoApi from "./zomato/ZomatoApi";

const cacheInterval = 15 * 60 * 1000;

class RestaurantProvider {
    static getDailyMenu(restaurantId, source, useCache = true) {
        if (!useCache) {
            return RestaurantProvider.getDailyMenuFromApi(restaurantId, source);
        }

        return FirebaseApi.loadRestaurant(restaurantId).then(value => {
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
                    FirebaseApi.storeRestaurant(restaurantId, data);
                    return data;
                });
        } else {
            throw new Error(`Source '${source}' is not implemented yet.`);
        }
    }
}

export default RestaurantProvider;