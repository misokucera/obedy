import config from "../../zomato.config";
import ZomatoNormalizer from "./ZomatoNormalizer";
import {DailyMenu} from "../restaurant";

export default class ZomatoApi {

    private static readonly url = config.api.url + 'dailymenu';

    static getDailyMenu(restaurantId: string): Promise<DailyMenu> {
        return ZomatoApi.fetch(this.url + '?res_id=' + restaurantId)
            .then(response => ZomatoNormalizer.normalizeDailyMenu(response));
    }

    private static fetch(url: string): Promise<any> {
        return fetch(url, {
            method: 'GET',
            headers: {'user-key': config.api.key}
        }).then(response => response.json());
    }

}