import firebase from "firebase/app";
import "firebase/database";

export type ListenerReference = firebase.database.Reference;

export class Database {

    static set(path: string, data: any) {
        return this.getRef(path).set(data);
    }

    static get(path: string): Promise<any> {
        return this.getRef(path).once('value').then(snapshot => snapshot.val());;
    }

    static addListener(path: string, callback: (data: any) => void): ListenerReference {
        const ref = this.getRef(path);
        ref.on('value', snapshot => {
            if (snapshot) {
                callback(snapshot.val())
            }
        });
        return ref;
    }

    static removeListener(ref: ListenerReference) {
        ref.off();
    }

    private static getRef(path: string): ListenerReference {
        return firebase.database().ref(path);
    }
}