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
}

export default FirebaseApi;