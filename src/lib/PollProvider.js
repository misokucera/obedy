import FirebaseApi from "./FirebaseApi";
import User from "./User";

class PollProvider {

    static create() {
        return FirebaseApi.push('polls');
    }

    static load(pollId, callback) {
        return FirebaseApi.subscribe('polls/' + pollId, (data) => {
            this.countResults(data, callback)
        });
    }

    static update(pollId, data) {
        const currentUser = User.getCurrentId();
        return FirebaseApi.set('polls/' + pollId + '/' + currentUser, {
            ...data,
            userName: User.getName(),
            updateTime: Date.now()
        });
    }

    static countResults(data, callback) {
        const currentUser = User.getCurrentId();

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