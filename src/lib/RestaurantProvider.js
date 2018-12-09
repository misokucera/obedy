import FirebaseApi from "./FirebaseApi";
import ZomatoApi from "./ZomatoApi";

const cacheInterval = 5 * 60 *1000;

class RestaurantProvider {
    static getDailyMenu(restaurantId, source) {
        return FirebaseApi.loadRestaurant(restaurantId).then(value => {
            if (!value || value.updatedTime < Date.now() - cacheInterval) {
                if (source === 'zomato') {
                    return ZomatoApi.getDailyMenu(restaurantId)
                        .then(data => {
                            FirebaseApi.storeRestaurant(restaurantId, data);
                            return data;
                        });
                } else {
                    throw new Error(`Source '${source}' is not implemented yet.`);
                }
            } else {
                return Promise.resolve(value);
            }
        });
    }
}

export default RestaurantProvider;