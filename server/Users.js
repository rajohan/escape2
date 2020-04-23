class Users {
    constructor() {
        if (!Users.instance) {
            this._users = [];
            this._guestNumber = [1];
            Users.instance = this;
        }

        return Users.instance;
    }

    addUser(id) {
        const user = { id, username: `guest${this._guestNumber[0]}` };
        this._guestNumber[0] = this._guestNumber[0] + 1;
        this._users.push(user);

        return user;
    }

    updateUsername(id, username) {
        const usernameTaken = this._users.filter((user) => user.username.toLowerCase() === username.toLowerCase());

        if (usernameTaken.length < 1) {
            const userIndex = this._users.findIndex((user) => id === user.id);
            this._users[userIndex].username = username;

            return this._users[userIndex];
        }

        return false;
    }

    removeUser(id) {
        const userIndex = this._users.findIndex((user) => id === user.id);

        if (userIndex !== -1) {
            return this._users.splice(userIndex, 1);
        }

        return false;
    }

    getUser(id) {
        return this._users.filter((user) => user.id === id)[0];
    }

    getUserList() {
        return this._users.map((user) => user);
    }
}

const instance = new Users();
Object.freeze(instance);

module.exports = instance;
