import config from "./../zomato.config";
import ZomatoNormalizer from "./ZomatoNormalizer";

const menuApiUrl = config.api.url + 'dailymenu';

class ZomatoApi {

    static getDailyMenu(restaurantId) {
        return ZomatoApi.fetch(menuApiUrl + '?res_id=' + restaurantId)
            .then(response => ZomatoNormalizer.normalizeDailyMenu(response));
    }

    static fetch(url) {
        return fetch(url, {
            method: 'GET',
            headers: {'user-key': config.api.key}
        }).then(response => response.json());
    }

}

export default ZomatoApi;