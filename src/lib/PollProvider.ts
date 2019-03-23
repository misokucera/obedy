import {Database, ListenerReference} from "./Database";
import ActiveUser from "./ActiveUser";

type SubscribeCallback = (voting?: Voting) => void;

export type Voting = { [key: string]: { votes: string[] } };

type Votes = string[];

export default class PollProvider {

    static subscribe(pollId: string, callback: SubscribeCallback): ListenerReference {
        return Database.addListener('polls/' + pollId, (response) => {
           callback(response);
        });
    }

    static update(pollId: string, votes: Votes) {
        const currentUser = ActiveUser.getId();
        return Database.set('polls/' + pollId + '/' + currentUser, {
            votes,
            userName: ActiveUser.getName(),
            updateTime: Date.now()
        });
    }

    static unsubscribe(ref: ListenerReference) {
        Database.removeListener(ref);
    }
}