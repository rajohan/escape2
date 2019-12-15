import React from "react";
import styled from "styled-components";

import Dice from "./Dice";
import {PRIMARY_COLOR, SECONDARY_COLOR} from "../constants/colors";
import Token from "./Token";

const StyledStatus = styled.div`
    display: flex;
    width: 1050px;
    color: #fff;
    align-items: center;
    justify-content: center;
`;

const PlayerBox = styled.div`
    background-color: ${PRIMARY_COLOR};
    border: 1px solid black;
    padding: 26px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    position: relative;
    
    img {
        margin-right: 20px;
    }
    
    :not(:first-of-type) {
        margin-left: auto;
    }
`;

const Turn = styled.div`
    position: absolute;
    bottom: -86px;
    left: 50%;
    transform: translate(-50%);
    background-color: ${SECONDARY_COLOR};
    padding: 30px;
    white-space: nowrap;
    visibility: ${props => props.nextPlayer ? "visible" : "hidden" };
    
    :before {
        content: "";
        position: absolute;
        top: -21px;
        left: 50%;
        transform: translate(-50%);
        border: 11px solid transparent;
        border-bottom-color: ${SECONDARY_COLOR};
    }
`;

const DiceBox = styled.div`
    background-color: ${PRIMARY_COLOR};
    border: 1px solid black;
    margin-left: auto;
    padding: 20px;
    padding-left: 0;
    border-radius: 3px;
`;

const Status = props => {
    return (
        <StyledStatus>
            <PlayerBox>
                <Token player={1} />
                {props.picks[0].name} (Player 1)
                <Turn nextPlayer={props.nextPlayer === 1}>
                    It's your turn!
                </Turn>
            </PlayerBox>
            <PlayerBox>
                <Token player={2} />
                {props.picks[1].name} (Player 2)
                <Turn nextPlayer={props.nextPlayer === 2}>
                    It's your turn!
                </Turn>
            </PlayerBox>
            <DiceBox>
                <Dice rollDice={props.rollDice} currentDiceNumber={props.currentDiceNumber} />
            </DiceBox>
        </StyledStatus>
    );
};

export default Status;