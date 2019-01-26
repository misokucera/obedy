import firebase from "firebase/app";
import "firebase/database";

// TODO: premenovat
class FirebaseApi {

    // TODO: presunut logiku vyssie
    static storeRestaurant(restaurantId, data) {
        return firebase.database().ref('restaurants/' + restaurantId).set(data);
    }

    // TODO: presunut logiku vyssie
    static loadRestaurant(restaurantId) {
        const promise = firebase.database().ref('restaurants/' + restaurantId).once('value');
        return promise.then(snapshot => snapshot.val());
    }

    static push(path) {
        return firebase.database().ref(path).push().key;
    }

    static subscribe(path, callback) {
        const ref = firebase.database().ref(path);
        ref.on('value', snapshot => callback(snapshot.val()));
        return ref;
    }

    static set(path, data) {
        return firebase.database().ref(path).set(data);
    }
}

export default FirebaseApi;