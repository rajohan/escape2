import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Dice from "./Dice";
import Token from "./Token";
import { ONLINE_MULTI_PLAYER } from "../../constants/gameTypes";
import { PLAYER_1, PLAYER_2 } from "../../constants/player";

const StyledStatus = styled.div`
    display: flex;
    width: 1050px;
    color: ${(props) => props.theme.colors.white};
    align-items: center;
    justify-content: center;
`;

const PlayerBox = styled.div`
    background-color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.black};
    padding: 26px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    position: relative;
    text-transform: capitalize;

    img {
        margin-right: 20px;
    }

    :not(:first-of-type) {
        margin-left: auto;
    }
`;

const Turn = styled.div`
    position: absolute;
    bottom: -88px;
    left: 50%;
    transform: translate(-50%);
    background-color: ${(props) => props.theme.colors.secondary};
    padding: 30px;
    white-space: nowrap;
    text-transform: capitalize;
    visibility: ${(props) => (props.nextPlayer ? "visible" : "hidden")};

    :before {
        content: "";
        position: absolute;
        top: -21px;
        left: 50%;
        transform: translate(-50%);
        border: 11px solid transparent;
        border-bottom-color: ${(props) => props.theme.colors.secondary};
    }
`;

const DiceBox = styled.div`
    background-color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.black};
    margin-left: auto;
    padding: 20px 20px 20px 0;
    border-radius: 3px;
`;

const Status = (props) => {
    return (
        <StyledStatus>
            <PlayerBox>
                <Token player={1} />
                {props.picks[0].name} (
                {props.gameType === ONLINE_MULTI_PLAYER
                    ? props.player === PLAYER_1
                        ? props.username
                        : props.opponent
                    : "Player 1"}
                )
                <Turn nextPlayer={props.nextPlayer === 1}>
                    It is
                    {props.gameType === ONLINE_MULTI_PLAYER
                        ? props.player === PLAYER_2
                            ? ` ${props.opponent}'s `
                            : " your "
                        : " your "}
                    turn!
                </Turn>
            </PlayerBox>
            <PlayerBox>
                <Token player={2} />
                {props.picks[1].name} (
                {props.gameType === ONLINE_MULTI_PLAYER
                    ? props.player === PLAYER_2
                        ? props.username
                        : props.opponent
                    : "Player 2"}
                )
                <Turn nextPlayer={props.nextPlayer === 2}>
                    It is
                    {props.gameType === ONLINE_MULTI_PLAYER
                        ? props.player === PLAYER_1
                            ? ` ${props.opponent}'s `
                            : " your "
                        : " your "}
                    turn!
                </Turn>
            </PlayerBox>
            <DiceBox>
                <Dice
                    rollDice={props.rollDice}
                    isDiceDisabled={props.isDiceDisabled}
                    currentDiceNumber={props.currentDiceNumber}
                    nextPlayer={props.nextPlayer}
                    gameType={props.gameType}
                    aiHasRolled={props.aiHasRolled}
                    setAiHasRolled={props.setAiHasRolled}
                    player1Position={props.player1Position}
                    player2Position={props.player2Position}
                />
            </DiceBox>
        </StyledStatus>
    );
};

Status.propTypes = {
    picks: PropTypes.array.isRequired,
    nextPlayer: PropTypes.number.isRequired,
    rollDice: PropTypes.func.isRequired,
    isDiceDisabled: PropTypes.bool.isRequired,
    currentDiceNumber: PropTypes.number.isRequired,
    gameType: PropTypes.string.isRequired,
    aiHasRolled: PropTypes.bool.isRequired,
    setAiHasRolled: PropTypes.func.isRequired,
    player1Position: PropTypes.number.isRequired,
    player2Position: PropTypes.number.isRequired,
    opponent: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    player: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default Status;
