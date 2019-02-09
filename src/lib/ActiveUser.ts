import uuidv4 from "uuid/v4";

export default class ActiveUser {

    private static readonly storageKeys = {
        uuid: 'uuid',
        userName: 'userName'
    }

    static getId(): string {
        let uuid = this.load(this.storageKeys.uuid);

        if (!uuid) {
            uuid = uuidv4();
            this.save(this.storageKeys.uuid, uuid);
        }

        return uuid;
    }

    static getName(): string {
        return this.load(this.storageKeys.userName);
    }

    static setName(name: string) {
        return this.save(this.storageKeys.userName, name || '');
    }

    private static load(key: string): string {
        return localStorage.getItem(key) || '';
    }

    private static save(key: string, name: string) {
        localStorage.setItem(key, name);
    }
}