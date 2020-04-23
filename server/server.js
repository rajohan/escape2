const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const Users = require("./Users");
const Rooms = require("./Rooms");

server.listen(8080, () => console.log("Server running on port 8080"));

app.get("/", (req, res) => {
    res.sendFile("../" + __dirname + "/build/index.html");
});

io.on("connection", (socket) => {
    socket.on("joinedLobby", () => {
        Users.addUser(socket.id);
        socket.join("lobby");
        io.to("lobby").emit("userList", { userList: Users.getUserList() });
        io.to("lobby").emit("roomList", { roomList: Rooms.getRoomList() });
    });

    socket.on("leaveLobby", () => {
        Users.removeUser(socket.id);
        socket.leave("lobby");
        io.to("lobby").emit("userList", { userList: Users.getUserList() });
        io.to("lobby").emit("roomList", { roomList: Rooms.getRoomList() });
    });

    socket.on("setUsername", (username, cb) => {
        if (Users.updateUsername(socket.id, username)) {
            cb(true);
            io.to("lobby").emit("userList", { userList: Users.getUserList() });
        } else {
            cb(false);
        }
    });

    socket.on("message", (message) => {
        const username = Users.getUser(socket.id).username;
        io.to("lobby").emit("message", { id: socket.id, user: username, message: message });
    });

    socket.on("createRoom", (name) => {
        Rooms.addRoom(name, socket.id);
        socket.join(name).leave("lobby");
        socket.to("lobby").emit("roomList", { roomList: Rooms.getRoomList() });
    });

    socket.on("joinRoom", (name) => {
        Rooms.joinRoom(name, socket.id);
        socket.join(name).leave("lobby");
        socket.to("lobby").emit("roomList", { roomList: Rooms.getRoomList() });
        socket.to(name).emit("opponentJoined", Users.getUser(socket.id).username);
    });

    socket.on("getRoomData", (name, cb) => {
        const { roomData, users } = Rooms.getRoomData(name);
        cb(roomData, Users.getUser(users[0]).username);
    });

    socket.on("roomDataUpdated", ({ roomName, data }) => {
        Rooms.updateRoomData(roomName, data);
    });

    socket.on("characterPicked", ({ charPick, gameRoom }) => {
        Rooms.updateRoomData(gameRoom, charPick);
        socket.broadcast.to(gameRoom).emit("characterPicked", charPick);
    });

    socket.on("rolledDice", ({ gameRoom, rolledNumber, playerPosition }) => {
        socket.broadcast.to(gameRoom).emit("rolledDice", { rolledNumber, playerPosition });
    });

    socket.on("leaveRoom", (name) => {
        Users.removeUser(socket.id);
        Rooms.leaveRoom(name, socket.id);
        socket.leave(name);
        Rooms.updateRoomData(name, {});
        socket.broadcast.to(name).emit("leftGameRoom", socket.id);
        io.to("lobby").emit("roomList", { roomList: Rooms.getRoomList() });
    });

    socket.on("disconnect", () => {
        Users.removeUser(socket.id);

        const rooms = Rooms.removeUserFromAllRooms(socket.id);
        rooms.forEach((room) => socket.broadcast.to(room.name).emit("leftGameRoom", socket.id));

        socket.leave("lobby");
        io.to("lobby").emit("roomList", { roomList: Rooms.getRoomList() });
        io.to("lobby").emit("userList", { userList: Users.getUserList() });
    });
});
