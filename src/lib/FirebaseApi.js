import firebase from "firebase/app";
import "firebase/database";

class FirebaseApi {

    static storeRestaurant(restaurantId, data) {
        return firebase.database().ref('restaurants/' + restaurantId).set(data);
    }

    static loadRestaurant(restaurantId) {
        const promise = firebase.database().ref('restaurants/' + restaurantId).once('value');
        return promise.then(snapshot => snapshot.val());
    }

    static createPoll() {
        return firebase.database().ref('polls').push().key;
    }

    static loadPoll(pollId, callback) {
        const ref = firebase.database().ref('polls/' + pollId);
        ref.on('value', callback);
        return ref;
    }

    static updatePoll(pollId, userId, data) {
        return firebase.database().ref('polls/' + pollId + "/" + userId).set({
            ...data,
            updateTime: Date.now()
        });
    }
}

export default FirebaseApi;