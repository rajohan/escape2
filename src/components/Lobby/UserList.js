import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SocketContext } from "react-socket-io";
import styled from "styled-components";

import Header from "../Shared/Header";

const StyledUserList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 200px;

    .users {
        display: flex;
        flex-direction: column;
        min-height: 250px;
        max-height: 250px;
        background-color: ${(props) => props.theme.colors.white};
        margin: 20px;
        font-size: 14px;
        overflow-y: scroll;
        color: ${(props) => props.theme.colors.black};
        padding: 10px;
        text-transform: capitalize;

        div {
            display: flex;
            align-items: center;
        }

        span {
            margin-bottom: 0;
            justify-content: flex-start;
            font-size: 12px;
            margin-left: 10px;
        }

        .ownUsername {
            color: ${(props) => props.theme.colors.secondary};
        }
    }

    span {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        margin-bottom: 20px;
    }
`;

const UserList = ({ userList, roomList }) => {
    const socket = useContext(SocketContext);

    const renderRoomsUserIsIn = (user) => {
        const rooms = roomList.filter((room) => room.users.includes(user.id));
        if (rooms.length > 0) {
            return <span>(In: {rooms.map((room) => room.name)})</span>;
        }
    };

    const renderUserList = () => {
        return userList.map((user, index) => (
            <div key={`user-${index}`} className={user.id === socket.id ? "ownUsername" : ""}>
                {user.username}
                {renderRoomsUserIsIn(user)}
            </div>
        ));
    };

    return (
        <StyledUserList>
            <Header>Users</Header>
            <div className="users">{renderUserList()}</div>
            <span>Users online: {userList.length}</span>
        </StyledUserList>
    );
};

UserList.propTypes = {
    userList: PropTypes.array.isRequired,
    roomList: PropTypes.array.isRequired
};

export default UserList;
