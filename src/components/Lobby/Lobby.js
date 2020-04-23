import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Event, SocketContext } from "react-socket-io";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Logo from "../Shared/Logo";
import UserList from "./UserList";
import Messages from "./Messages";
import Username from "./Username";
import Lobbies from "./Lobbies";
import { ONLINE_MULTI_PLAYER } from "../../constants/gameTypes";
import Modal from "../Shared/Modal";

const StyledLobby = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    max-width: 1000px;
    width: 100%;
`;

const ChatWrapper = styled.div`
    background-color: ${(props) => props.theme.colors.primary};
    width: 100%;
    display: flex;
    margin-bottom: 40px;
    box-shadow: ${(props) => props.theme.boxShadow.main};
`;

const Lobby = ({ gameType, username, setUsername, setGameRoom, setPlayer }) => {
    const socket = useContext(SocketContext);
    const history = useHistory();
    const [userList, setUserList] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [isUsernameSet, setIsUsernameSet] = useState(false);
    const [usernameError, setUsernameError] = useState("");

    // Run cleanup on unmount
    useEffect(() => {
        window.onpopstate = () => socket.emit("leaveLobby");

        return () => {
            socket.removeListener("roomList").removeListener("userList").removeListener("message");
            window.removeEventListener("onpopstate", () => socket.emit("leaveLobby"));
        };
    }, [socket]);

    // Validation of game type
    useEffect(() => {
        if (!gameType || gameType !== ONLINE_MULTI_PLAYER) {
            history.push("/");
        } else {
            socket.emit("joinedLobby");
        }
    }, [gameType, history, socket]);

    const handleSetUsername = () => {
        if (username.length < 2) {
            return setUsernameError("Username have to be at least 2 characters");
        } else if (username.length > 8) {
            return setUsernameError("Username can be max 8 characters");
        }

        setUsernameError("");
        socket.emit("setUsername", username, (success) => {
            if (success) {
                setUsernameError("");
                setIsUsernameSet(true);
            } else {
                setUsernameError(`The username ${username} is already taken`);
            }
        });
    };

    return (
        <StyledLobby>
            <Logo />
            <Modal isHidden={isUsernameSet} header="Select a username" onConfirm={handleSetUsername}>
                <Username
                    username={username}
                    handleSetUsername={handleSetUsername}
                    setUsername={setUsername}
                    usernameError={usernameError}
                />
            </Modal>
            <Event event="roomList" handler={({ roomList }) => setRoomList(roomList)} />
            <Lobbies
                roomList={roomList}
                userList={userList}
                username={username}
                setGameRoom={setGameRoom}
                setPlayer={setPlayer}
            />
            <ChatWrapper>
                <Event event="message" handler={(message) => setAllMessages((prevState) => [...prevState, message])} />
                <Messages messages={allMessages} />
                <Event event="userList" handler={({ userList }) => setUserList(userList)} />
                <UserList userList={userList} roomList={roomList} />
            </ChatWrapper>
        </StyledLobby>
    );
};

Lobby.propTypes = {
    gameType: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setGameRoom: PropTypes.func.isRequired,
    setPlayer: PropTypes.func.isRequired
};

export default Lobby;
