import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Event, SocketContext } from "react-socket-io";
import styled from "styled-components";

import Logo from "../Shared/Logo";
import Card from "./Card";
import Modal from "../Shared/Modal";
import { fetchData } from "./fetchData";
import { LOCAL_MULTI_PLAYER, ONLINE_MULTI_PLAYER, SINGLE_PLAYER } from "../../constants/gameTypes";
import { PLAYER_1, PLAYER_2 } from "../../constants/player";

const StyledPick = styled.div`
    max-width: 900px;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`;

const StyledHeader = styled.h1`
    background-color: ${(props) => props.theme.colors.secondary};
    display: flex;
    padding: 20px;
    justify-content: center;
    box-shadow: ${(props) => props.theme.boxShadow.main};
    margin: 20px;
    text-transform: capitalize;
`;

const CardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
    justify-items: center;
`;

const Pick = (props) => {
    const socket = useContext(SocketContext);
    const history = useHistory();
    const [characters, setCharacters] = useState([]);
    const [opponentLeft, setOpponentLeft] = useState(false);
    const { picks, traps, setTraps, setPicks, gameRoom, player, gameType, username, opponent, setOpponent } = props;

    // Run cleanup on unmount
    useEffect(() => {
        setPicks([]);
        window.onpopstate = () => socket.emit("leaveRoom", gameRoom);

        return () => {
            socket.removeListener("opponentJoined").removeListener("characterPicked").removeListener("leftGameRoom");
            window.removeEventListener("onpopstate", () => socket.emit("leaveRoom", gameRoom));
        };
    }, [socket, gameRoom, setPicks]);

    // update roomData on server side with api fetch and move traps to this component
    useEffect(() => {
        if (!gameType) {
            history.push("/");
        } else if (picks.length > 1) {
            history.push("/play");
        } else if (picks.length === 0) {
            if (gameType !== ONLINE_MULTI_PLAYER || player === PLAYER_1) {
                for (let i = 1; i <= 10; i++) {
                    fetchData(i, setCharacters).catch((err) => console.log(err));
                }
            }
        }
    }, [gameType, history, picks.length, player]);

    // Create the traps
    useEffect(() => {
        if (picks.length === 0 && player !== PLAYER_2) {
            setTraps([
                Math.ceil(Math.random() * 4 + 2),
                Math.ceil(Math.random() * 6 + 6),
                Math.ceil(Math.random() * 6 + 12),
                Math.ceil(Math.random() * 6 + 18),
                Math.ceil(Math.random() * 5 + 24)
            ]);
        }
    }, [setTraps, picks.length, player]);

    // Send characters and traps to server for player 2 to fetch
    useEffect(() => {
        if (gameType === ONLINE_MULTI_PLAYER && characters.length === 10 && player === PLAYER_1) {
            socket.emit("roomDataUpdated", { roomName: gameRoom, data: { characters, traps } });
        }
    }, [characters, gameRoom, gameType, socket, player, traps]);

    // Fetch characters and traps as player 2
    useEffect(() => {
        if (gameType === ONLINE_MULTI_PLAYER && player === PLAYER_2) {
            socket.emit("getRoomData", gameRoom, (data, opponent) => {
                setCharacters(data.characters);
                setTraps(data.traps);
                setOpponent(opponent);
            });
        }
    }, [gameRoom, gameType, player, socket, setTraps, setCharacters, setOpponent]);

    const handlePick = (charPick) => {
        if (gameType === SINGLE_PLAYER) {
            const charactersLeft = characters.filter((char) => char !== charPick);
            const aiPick = charactersLeft[Math.ceil(Math.random() * (charactersLeft.length + 1)) - 1];
            setPicks([charPick, aiPick]);
        } else if (gameType === LOCAL_MULTI_PLAYER) {
            setPicks((prevState) => [...prevState, charPick]);
        } else {
            socket.emit("characterPicked", { charPick, gameRoom });
            setPicks((prevState) => [...prevState, charPick]);
        }
    };

    const renderCards = () => {
        return characters.map((char, index) => {
            return (
                <Card
                    key={index}
                    picks={picks}
                    gameType={gameType}
                    player={player}
                    onPick={() => handlePick(char)}
                    data={char}
                    username={username}
                    opponent={opponent}
                />
            );
        });
    };

    const handleOpponentLeft = () => {
        socket.emit("leaveRoom", gameRoom);
        history.push("/lobby");
    };

    return (
        <React.Fragment>
            <Event event="opponentJoined" handler={(username) => setOpponent(username)} />
            <Event event="characterPicked" handler={(charPick) => setPicks((prevState) => [...prevState, charPick])} />
            <Modal
                isHidden={
                    gameType !== ONLINE_MULTI_PLAYER ||
                    (player === PLAYER_1 && opponent.length > 0) ||
                    player === PLAYER_2
                }
                button={false}
                header="Waiting for opponent"
            >
                Please wait for an opponent to join the game
            </Modal>
            <Event event="leftGameRoom" handler={() => setOpponentLeft(true)} />
            <Modal isHidden={!opponentLeft} header="Opponent left" onConfirm={handleOpponentLeft}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Your opponent left the game. Click "OK" to get back to the lobby.
            </Modal>
            <StyledPick>
                <Logo />
                <StyledHeader>
                    {gameType !== ONLINE_MULTI_PLAYER
                        ? `Player ${picks.length < 1 ? "1" : "2"} pick your character`
                        : picks.length < 1
                        ? player === PLAYER_1
                            ? `${username} pick your character`
                            : `Wait while ${opponent} picks a character`
                        : player === PLAYER_2
                        ? `${username} pick your character`
                        : `Wait while ${opponent} picks a character`}
                </StyledHeader>
                <CardsWrapper>{renderCards()}</CardsWrapper>
            </StyledPick>
        </React.Fragment>
    );
};

Pick.propTypes = {
    picks: PropTypes.array.isRequired,
    traps: PropTypes.array.isRequired,
    setTraps: PropTypes.func.isRequired,
    setPicks: PropTypes.func.isRequired,
    gameRoom: PropTypes.string.isRequired,
    player: PropTypes.string.isRequired,
    gameType: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    opponent: PropTypes.string.isRequired,
    setOpponent: PropTypes.func.isRequired
};

export default Pick;
