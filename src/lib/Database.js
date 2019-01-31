import firebase from "firebase/app";
import "firebase/database";

function getRef(path) {
    return firebase.database().ref(path);
}

class Database {

    static set(path, data) {
        return getRef(path).set(data);
    }

    static get(path) {
        return getRef(path).once('value').then(snapshot => snapshot.val());;
    }

    static addListener(path, callback) {
        const ref = getRef(path);
        ref.on('value', snapshot => callback(snapshot.val()));
        return ref;
    }

    static removeListener(ref) {
        ref.off();
    }
}

export default Database;