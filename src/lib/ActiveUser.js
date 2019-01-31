import uuidv4 from "uuid/v4";

const storageUuidKey = 'uuid';
const storageUserNameKey = 'userName';

function getFromStorage(key) {
    return localStorage.getItem(key) || '';
}

function setToStorageName(key, name) {
    localStorage.setItem(key, name);
}

class ActiveUser {
    static getId() {
        let uuid = getFromStorage(storageUuidKey);

        if (!uuid) {
            uuid = uuidv4();
            setToStorageName(storageUuidKey, uuid);
        }

        return uuid;
    }

    static getName() {
        return getFromStorage(storageUserNameKey);
    }

    static setName(name) {
        return setToStorageName(storageUserNameKey, name || '');
    }
}

export default ActiveUser;