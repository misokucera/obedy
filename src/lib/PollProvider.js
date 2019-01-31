import Database from "./Database";
import ActiveUser from "./ActiveUser";

class PollProvider {

    static subscribe(pollId, callback) {
        return Database.addListener('polls/' + pollId, (data) => {
            this.countResults(data, callback)
        });
    }

    static update(pollId, data) {
        const currentUser = ActiveUser.getId();
        return Database.set('polls/' + pollId + '/' + currentUser, {
            ...data,
            userName: ActiveUser.getName(),
            updateTime: Date.now()
        });
    }

    static unsubscribe(ref) {
        Database.removeListener(ref);
    }

    static countResults(data, callback) {
        const currentUser = ActiveUser.getId();

        let results = {};
        let userCount = 0;

        for (const userId in data) {

            if (data.hasOwnProperty(userId) && data[userId].votes) {
                userCount++;
                const userName = data[userId].userName || '';

                const votes = data[userId].votes;

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

            data[currentUser].votes.forEach(voteId => {
                results[voteId] = {
                    ...results[voteId],
                    selected: true
                }
            });
        }

        callback(results, userCount);
    };
}

export default PollProvider;