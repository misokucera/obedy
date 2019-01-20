import uuidv4 from "uuid/v4";

class User {
    static getCurrentId() {
        let uuid = localStorage.getItem("uuid");

        if (!uuid) {
            uuid = uuidv4();
            localStorage.setItem("uuid", uuid);
        }

        return uuid;
    }
}

export default User;