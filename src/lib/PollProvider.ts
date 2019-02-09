import {Database, ListenerReference} from "./Database";
import ActiveUser from "./ActiveUser";

type SubscribeCallback = (results: Results, userCount: number) => void;
type Results = { [key: string]: Result };
type Result = {
    count: number,
    users: string[],
    selected: boolean
};
type Votes = string[];

export default class PollProvider {

    static subscribe(pollId: string, callback: SubscribeCallback): ListenerReference {
        return Database.addListener('polls/' + pollId, (response) => {
            this.countResults(response, callback)
        });
    }

    static update(pollId: string, votes: Votes) {
        const currentUser = ActiveUser.getId();
        return Database.set('polls/' + pollId + '/' + currentUser, {
            ...votes,
            userName: ActiveUser.getName(),
            updateTime: Date.now()
        });
    }

    static unsubscribe(ref: ListenerReference) {
        Database.removeListener(ref);
    }

    private static countResults(data: any, callback: SubscribeCallback) {
        const currentUser = ActiveUser.getId();

        let results: Results = {};
        let userCount = 0;

        for (const userId in data) {

            if (data.hasOwnProperty(userId) && data[userId].votes) {
                userCount++;

                const userName = data[userId].userName || '';
                const votes: string[] = data[userId].votes;

                votes.forEach(voteId => {
                    if (results[voteId]) {
                        results[voteId].count++;
                        results[voteId].users.push(userName);
                    } else {
                        results[voteId] = { count: 1, selected: false, users: [userName] };
                    }
                });
            }
        }

        if (data && data[currentUser] && data[currentUser].votes) {

            const votes: string[] = data[currentUser].votes;
            votes.forEach(voteId => {
                results[voteId] = {
                    ...results[voteId],
                    selected: true
                }
            });
        }

        callback(results, userCount);
    };
}