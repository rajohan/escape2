import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { SocketContext } from "react-socket-io";
import styled from "styled-components";

import Header from "../Shared/Header";
import Button from "../Shared/Button";

const StyledMessages = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    width: 100%;

    .chatMessages {
        display: flex;
        flex-direction: column;
        min-height: 250px;
        max-height: 250px;
        max-width: 730px;
        background-color: ${(props) => props.theme.colors.white};
        margin: 20px 0 0 20px;
        font-size: 14px;
        overflow-y: scroll;
        color: ${(props) => props.theme.colors.black};
        padding: 10px;
        overflow-wrap: break-word;

        div::first-letter {
            text-transform: capitalize;
        }

        .ownUsername {
            color: ${(props) => props.theme.colors.secondary};
        }
    }

    .newMessage {
        display: flex;
        margin: 20px 0 20px 20px;

        input {
            width: 100%;
            padding: 10px;
            outline: none;
            margin-right: 20px;
        }
    }
`;

const Messages = ({ messages }) => {
    const socket = useContext(SocketContext);
    const [message, setMessage] = useState("");

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.length > 0) {
            socket.emit("message", message);
            setMessage("");
        }
    };

    const renderMessages = () => {
        return messages.map((message, index) => (
            <div key={`message-${index}`} className={message.id === socket.id ? "ownUsername" : ""}>
                {message.user}: {message.message}
            </div>
        ));
    };

    return (
        <StyledMessages>
            <Header>Chat</Header>
            <div className="chatMessages">{renderMessages()}</div>
            <div className="newMessage">
                <input
                    type="text"
                    value={message}
                    onKeyDown={({ key }) => key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    onChange={handleMessageChange}
                />
                <Button onClick={handleSendMessage}>Send</Button>
            </div>
        </StyledMessages>
    );
};

Messages.propTypes = {
    messages: PropTypes.array.isRequired
};

export default Messages;
