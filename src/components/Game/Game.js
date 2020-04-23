import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import { SocketContext } from "react-socket-io";
import { Event } from "react-socket-io";
import styled from "styled-components";

import Logo from "../Shared/Logo";
import Board from "./Board";
import Modal from "../Shared/Modal";
import Winner from "./Winner";
import Status from "./Status";
import { GAME_TRAPS } from "../../constants/traps";
import { ONLINE_MULTI_PLAYER, SINGLE_PLAYER } from "../../constants/gameTypes";
import { PLAYER_1, PLAYER_2 } from "../../constants/player";

const StyledWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Game = (props) => {
    const socket = useContext(SocketContext);
    const history = useHistory();
    const [opponentLeft, setOpponentLeft] = useState(false);
    const [nextPlayer, setNextPlayer] = useState(1);
    const [currentDiceNumber, setDiceNumber] = useState(1);
    const [player1Position, setPlayer1Position] = useState(1);
    const [player2Position, setPlayer2Position] = useState(1);
    const [aiHasRolled, setAiHasRolled] = useState(false);
    const [winner, setWinner] = useState({});
    const [currentTrap, setCurrentTrap] = useState(GAME_TRAPS[Math.floor(Math.random() * GAME_TRAPS.length)]);
    const [modalContent, setModalContent] = useState({
        text: "",
        isHidden: true
    });

    const { traps, gameRoom, picks, player, gameType, setPicks, username, opponent } = props;

    // Run cleanup on unmount
    useEffect(() => {
        window.onpopstate = () => socket.emit("leaveRoom", gameRoom);

        return () => {
            socket.removeListener("rolledDice").removeListener("leftGameRoom");
            window.removeEventListener("onpopstate", () => socket.emit("leaveRoom", gameRoom));
        };
    }, [socket, gameRoom]);

    // Check if a player have won the game
    useEffect(() => {
        if (player1Position >= 30) {
            socket.removeListener("rolledDice").removeListener("leftGameRoom");
            setWinner({
                ...picks[0],
                player: gameType === ONLINE_MULTI_PLAYER ? (player === PLAYER_1 ? username : opponent) : "Player 1"
            });
        } else if (player2Position >= 30) {
            socket.removeListener("rolledDice").removeListener("leftGameRoom");
            setWinner({
                ...picks[1],
                player: gameType === ONLINE_MULTI_PLAYER ? (player === PLAYER_2 ? username : opponent) : "Player 2"
            });
        }
    }, [player1Position, player2Position, picks, socket, gameType, player, username, opponent]);
    const checkTrap = (position) => {
        if (traps.includes(position)) {
            setModalContent({ text: currentTrap[1], isHidden: false });
            gameType === SINGLE_PLAYER && nextPlayer === 2 && setTimeout(() => confirmTrap(), 1500);
            return true;
        } else {
            setModalContent({ text: "", isHidden: true });
            return false;
        }
    };

    const confirmTrap = () => {
        const thisTrap = currentTrap[0];
        setCurrentTrap(GAME_TRAPS[Math.floor(Math.random() * GAME_TRAPS.length)]);
        return changePlayerPosition(thisTrap);
    };

    const changePlayerPosition = (rolledNumber) => {
        const func = nextPlayer === 1 ? setPlayer1Position : setPlayer2Position;

        func((prevPosition) => {
            socket.emit("rolledDice", { gameRoom, rolledNumber, playerPosition: prevPosition + rolledNumber });
            if (checkTrap(prevPosition + rolledNumber)) {
                socket.emit("rolledDice", { gameRoom, rolledNumber, playerPosition: prevPosition + rolledNumber });
                return prevPosition + rolledNumber;
            } else {
                changePlayer(rolledNumber);
                if (prevPosition + rolledNumber <= 1) {
                    socket.emit("rolledDice", { gameRoom, rolledNumber, playerPosition: 1 });
                    return 1;
                }
                socket.emit("rolledDice", { gameRoom, rolledNumber, playerPosition: prevPosition + rolledNumber });
                return prevPosition + rolledNumber;
            }
        });
    };

    const changePlayer = (rolledNumber) => {
        if (rolledNumber !== 6) {
            setNextPlayer(nextPlayer === 1 ? 2 : 1);
            setAiHasRolled(false);
        } else if (rolledNumber === 6) {
            setAiHasRolled(false);
        }
    };

    const rollDice = (rolledNumber) => {
        setDiceNumber(rolledNumber);
        changePlayerPosition(rolledNumber);
    };

    const confirmWinner = () => {
        setPicks([]);
        history.push("/");
    };

    const handleRolledNumber = ({ rolledNumber, playerPosition }) => {
        if (player === PLAYER_1) {
            setPlayer2Position(playerPosition);
            if (rolledNumber !== 6 && !traps.includes(playerPosition)) {
                setNextPlayer(1);
            }
        } else {
            setPlayer1Position(playerPosition);
            if (rolledNumber !== 6 && !traps.includes(playerPosition)) {
                setNextPlayer(2);
            }
        }
    };

    const handleOpponentLeft = () => {
        socket.emit("leaveRoom", gameRoom);
        history.push("/lobby");
    };

    return picks.length > 1 ? (
        <StyledWrapper>
            <Event event="leftGameRoom" handler={() => setOpponentLeft(true)} />
            <Modal isHidden={!opponentLeft} header="Opponent left" onConfirm={handleOpponentLeft}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Your opponent left the game. Click "OK" to get back to the lobby.
            </Modal>
            <Logo />
            <Board player1Position={player1Position} player2Position={player2Position} traps={traps} />
            <Event event="rolledDice" handler={handleRolledNumber} />
            <Status
                player1Position={player1Position}
                player2Position={player2Position}
                nextPlayer={nextPlayer}
                player={player}
                username={username}
                opponent={opponent}
                gameType={gameType}
                rollDice={rollDice}
                aiHasRolled={aiHasRolled}
                setAiHasRolled={setAiHasRolled}
                isDiceDisabled={
                    (gameType === ONLINE_MULTI_PLAYER &&
                        ((nextPlayer === 1 && player === PLAYER_2) || (nextPlayer === 2 && player === PLAYER_1))) ||
                    (gameType === SINGLE_PLAYER && nextPlayer === 2)
                }
                currentDiceNumber={currentDiceNumber}
                picks={picks}
            />
            <Modal
                isHidden={modalContent.isHidden || (gameType === SINGLE_PLAYER && nextPlayer === 2)}
                onConfirm={() => confirmTrap()}
            >
                {modalContent.text}
            </Modal>
            <Winner content={winner} isHidden={!winner.name} confirmWinner={() => confirmWinner()} />
        </StyledWrapper>
    ) : (
        <Redirect to="/pick" />
    );
};

Game.propTypes = {
    traps: PropTypes.array.isRequired,
    gameRoom: PropTypes.string.isRequired,
    picks: PropTypes.array.isRequired,
    player: PropTypes.string.isRequired,
    gameType: PropTypes.string.isRequired,
    setPicks: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    opponent: PropTypes.string.isRequired
};

export default Game;
