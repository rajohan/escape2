class Rooms {
    constructor() {
        if (!Rooms.instance) {
            this._rooms = [];
            Rooms.instance = this;
        }

        return Rooms.instance;
    }

    addRoom(name, userId) {
        const roomIndex = this.getRoomIndex(name);

        if (roomIndex === -1) {
            this._rooms.push({ name, users: [userId], roomData: {} });

            return { name };
        }

        return false;
    }

    joinRoom(name, userId) {
        const roomIndex = this.getRoomIndex(name);

        if (roomIndex !== -1 && !this._rooms[roomIndex].users.includes(userId)) {
            return this._rooms[roomIndex].users.push(userId);
        }

        return false;
    }

    leaveRoom(name, userId) {
        const roomIndex = this.getRoomIndex(name);

        if (roomIndex !== -1) {
            const userIndex = this._rooms[roomIndex].users.findIndex((id) => userId === id);

            if (this._rooms[roomIndex].users.length <= 1) {
                this.removeRoom(name);
            } else {
                return this._rooms[roomIndex].users.splice(userIndex, 1);
            }
        }

        return false;
    }

    updateRoomData(name, roomData) {
        const roomIndex = this.getRoomIndex(name);

        if (roomIndex !== -1) {
            this._rooms[roomIndex].roomData = roomData;

            return this._rooms[roomIndex].roomData;
        }

        return false;
    }

    getRoomData(name) {
        const roomIndex = this.getRoomIndex(name);

        if (roomIndex !== -1) {
            return { roomData: this._rooms[roomIndex].roomData, users: this._rooms[roomIndex].users };
        }

        return false;
    }

    removeRoom(name) {
        const roomIndex = this.getRoomIndex(name);

        if (roomIndex !== -1) {
            return this._rooms.splice(roomIndex, 1);
        }

        return false;
    }

    getRoomIndex(name) {
        return this._rooms.findIndex((room) => name === room.name);
    }

    getRoomList() {
        return this._rooms.map((room) => room);
    }

    removeUserFromAllRooms(userId) {
        const rooms = this._rooms.filter((room) => room.users.includes(userId));

        if (rooms.length > 0) {
            rooms.forEach((room) => this.leaveRoom(room.name, userId));
        }

        return rooms;
    }
}

const instance = new Rooms();
Object.freeze(instance);

module.exports = instance;
