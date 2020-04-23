import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SocketContext } from "react-socket-io";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Header from "../Shared/Header";
import { PLAYER_1, PLAYER_2 } from "../../constants/player";
import Button from "../Shared/Button";

const LobbyWrapper = styled.div`
    background-color: ${(props) => props.theme.colors.primary};
    width: 100%;
    margin-top: 20px;
    box-shadow: ${(props) => props.theme.boxShadow.main};

    .lobbies {
        min-height: 170px;
        max-height: 170px;
        background-color: ${(props) => props.theme.colors.white};
        margin: 20px;
        overflow-y: scroll;
        color: ${(props) => props.theme.colors.black};
        padding: 10px;
        text-transform: capitalize;
        font-size: 14px;

        .usersInLobby {
            font-size: 14px;
            margin: 10px 10px;
        }

        .joinLobby {
            cursor: pointer;
            color: ${(props) => props.theme.colors.text}
            background-color: ${(props) => props.theme.colors.button};
            padding: 3px 15px;
            border-radius: 3px;

            &:hover {
                background-color: ${(props) => props.theme.colors.button2};
            }
        }
    }
    
    .lobbyItem:not(:last-of-type) {
        margin-bottom: 10px;
    }

    .newLobby {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 20px 20px 20px;
    }
`;

const Lobbies = ({ roomList, userList, username, setGameRoom, setPlayer }) => {
    const socket = useContext(SocketContext);
    const history = useHistory();

    const handleCreateRoom = () => {
        socket.emit("createRoom", `${username}'s lobby`);
        setGameRoom(`${username}'s lobby`);
        setPlayer(PLAYER_1);
        history.push("/pick");
    };

    const handleJoinRoom = (room) => {
        socket.emit("joinRoom", room.name);
        setGameRoom(room.name);
        setPlayer(PLAYER_2);
        history.push("/pick");
    };

    const renderRooms = () => {
        return roomList.map((room, index) => (
            <div className="lobbyItem" key={`room-${index}`}>
                {room.name}
                <span className="usersInLobby">
                    (Users in lobby:{" "}
                    {room.users.map((userId, index) => {
                        const userIndex = userList.findIndex((user) => userId === user.id);
                        return index === 0 ? userList[userIndex].username : `, ${userList[userIndex].username}`;
                    })}
                    )
                </span>
                {!room.users.includes(socket.id) && room.users.length < 2 && (
                    <span className="joinLobby" onClick={() => handleJoinRoom(room)}>
                        Join
                    </span>
                )}
            </div>
        ));
    };

    return (
        <LobbyWrapper>
            <Header>Lobbies</Header>
            <div className="lobbies">{renderRooms()}</div>
            <div className="newLobby">
                <Button size="big" onClick={handleCreateRoom}>
                    Create new lobby
                </Button>
                <span>Total lobbies: {roomList.length}</span>
            </div>
        </LobbyWrapper>
    );
};

Lobbies.propTypes = {
    roomList: PropTypes.array.isRequired,
    userList: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    setGameRoom: PropTypes.func.isRequired,
    setPlayer: PropTypes.func.isRequired
};

export default Lobbies;
