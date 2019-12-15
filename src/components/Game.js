import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import styled from "styled-components";

import Board from "./Board";
import Modal from "./Modal";
import Winner from "./Winner";
import Status from "./Status";
import {GAME_TRAPS} from "../constants/traps";

const StyledWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const StyledImg = styled.img`
    width: 400px;
    margin-top: 20px;
    display: block;
`;

const Game = props => {
    const [nextPlayer, setNextPlayer] = useState(1);
    const [currentDiceNumber, setDiceNumber] = useState(1);
    const [player1Position, setPlayer1Position] = useState(1);
    const [player2Position, setPlayer2Position] = useState(1);
    const [winner, setWinner] = useState(false);
    const [currentTrap, setCurrentTrap] = useState(GAME_TRAPS[Math.floor(Math.random() * GAME_TRAPS.length)]);
    const [modalContent, setModalContent] = useState({
        text: "",
        isHidden: true
    });

    const [traps] = useState([
        Math.ceil((Math.random() * 4) + 2),
        Math.ceil((Math.random() * 6) + 6),
        Math.ceil((Math.random() * 6) + 12),
        Math.ceil((Math.random() * 6) + 18),
        Math.ceil((Math.random() * 5) + 24)
    ]);

    // Check if a player have won the game
    useEffect(() => {
        if(player1Position >= 30) {
            setWinner({...props.picks[0], player: "1"})
        } else if(player2Position >= 30) {
            setWinner({...props.picks[1], player: "2"})
        }
    }, [player1Position, player2Position, props.picks]);

    const checkTrap = position => {
        if(traps.includes(position)) {
            setModalContent({text: currentTrap[1], isHidden: false});
            return true;
        } else {
            setModalContent({text: "", isHidden: true});
            return false;
        }
    };

    const confirmTrap = () => {
        const thisTrap = currentTrap[0];
        setCurrentTrap(GAME_TRAPS[Math.floor(Math.random() * GAME_TRAPS.length)]);
        return changePlayerPosition(thisTrap);
    };

    const changePlayerPosition = rolledNumber => {
        if(nextPlayer === 1) {
            setPlayer1Position(prevPosition => {
                if(checkTrap(prevPosition + rolledNumber)) {
                    return prevPosition + rolledNumber;
                } else {
                    changePlayer(rolledNumber);
                    if(prevPosition + rolledNumber <= 1) {
                        return 1
                    }
                    return prevPosition + rolledNumber;
                }
            });
        } else {
            setPlayer2Position(prevPosition => {
                if(checkTrap(prevPosition + rolledNumber)) {
                    return prevPosition + rolledNumber;
                } else {
                    changePlayer(rolledNumber);
                    if(prevPosition + rolledNumber <= 1) {
                        return 1
                    }
                    return prevPosition + rolledNumber;
                }
            });
        }
    };

    const changePlayer = rolledNumber => {
        if(rolledNumber !== 6) {
            setNextPlayer(nextPlayer === 1 ? 2 : 1);
        }
    };

    const rollDice = rolledNumber => {
        setDiceNumber(rolledNumber);
        changePlayerPosition(rolledNumber);
    };

    const confirmWinner = () => {
        console.log("Ok!");
    };

    return (
        props.picks.length > 1
            ?
            <StyledWrapper>
                <StyledImg src={require("../img/logo.png")} alt="The Escape"/>
                <Board player1Position={player1Position} player2Position={player2Position} traps={traps} />
                <Status player1Position={player1Position} player2Position={player2Position} nextPlayer={nextPlayer} rollDice={rollDice} currentDiceNumber={currentDiceNumber} picks={props.picks} />
                <Modal content={modalContent.text} isHidden={modalContent.isHidden} confirmTrap={() => confirmTrap()} />
                <Winner content={winner} isHidden={winner === false} confirmWinner={() => confirmWinner()}/>
            </StyledWrapper>
            :
            <Redirect to="/pick" />
    );
};

export default Game;