import {Database, ListenerReference} from "./Database";
import ActiveUser from "./ActiveUser";

type SubscribeCallback = (result?: Result) => void;

type UserChoice = {
    userName: string,
    restaurantIds: string[]
};

export type Result = {
    [key: string]: UserChoice
};

export default class PollProvider {

    static subscribe(pollId: string, callback: SubscribeCallback): ListenerReference {
        return Database.addListener('polls/' + pollId, (response) => {
           callback(response);
        });
    }

    static update(pollId: string, restaurantIds: string[]) {
        const currentUser = ActiveUser.getId();
        return Database.set('polls/' + pollId + '/' + currentUser, {
            restaurantIds,
            userName: ActiveUser.getName(),
            updateTime: Date.now()
        });
    }

    static unsubscribe(ref: ListenerReference) {
        Database.removeListener(ref);
    }
}