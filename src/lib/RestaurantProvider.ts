import {Database} from "./Database";
import ZomatoApi from "./zomato/ZomatoApi";
import {DailyMenu} from "./restaurant";

export default class RestaurantProvider {

    private static readonly cacheInterval = 15 * 60 * 1000;

    static getDailyMenu(restaurantId: string, source: string, useCache: boolean = true): Promise<DailyMenu> {
        if (!useCache) {
            return RestaurantProvider.getDailyMenuFromApi(restaurantId, source);
        }

        return Database.get('restaurants/' + restaurantId).then(value => {
            if (!value || value.updateTime < Date.now() - this.cacheInterval) {
                return RestaurantProvider.getDailyMenuFromApi(restaurantId, source);
            } else {
                return Promise.resolve(value);
            }
        });
    }

    private static getDailyMenuFromApi(restaurantId: string, source: string): Promise<DailyMenu> {
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