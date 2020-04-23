import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { css, keyframes } from "styled-components";

import Button from "../Shared/Button";
import { SINGLE_PLAYER } from "../../constants/gameTypes";

const rotate = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const blur = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const StyledDiceWrapper = styled.div`
    display: flex;
    margin-left: 20px;
`;

const StyledDice = styled.div`
    display: grid;
    grid-template: "1fr 1fr 1fr";
    justify-items: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: inset 0 0 5px ${(props) => props.theme.colors.gray};
    border-radius: 5px;
    padding: 10px;
    animation: ${(props) =>
        props.animate
            ? css`
                  ${rotate} 1s ease 0s
              `
            : "none"};
    margin-right: 10px;
`;

const StyledDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50px;
    background: ${(props) => props.theme.colors.primary};
    visibility: ${(props) => (props.hide === true ? "hidden" : "visible")};
    animation: ${(props) =>
        props.animate
            ? css`
                  ${blur} 2s ease 0s
              `
            : "none"};
`;

const StyledButton = styled(Button)`
    font-size: 16px;
`;

const Dice = (props) => {
    const {
        rollDice,
        currentDiceNumber,
        isDiceDisabled,
        nextPlayer,
        gameType,
        aiHasRolled,
        setAiHasRolled,
        player1Position,
        player2Position
    } = props;
    const [animate, setAnimate] = useState(false);

    const onButtonClick = useCallback(() => {
        rollDice(Math.ceil(Math.random() * 6));
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 1000);
    }, [rollDice]);

    useEffect(() => {
        if (gameType === SINGLE_PLAYER && nextPlayer === 2 && !aiHasRolled) {
            if (player1Position <= 30 && player2Position <= 30) {
                setTimeout(() => onButtonClick(), 2000);
            }
            setAiHasRolled(true);
        }
    }, [aiHasRolled, nextPlayer, gameType, setAiHasRolled, onButtonClick, player1Position, player2Position]);

    return (
        <StyledDiceWrapper>
            <StyledDice animate={animate} diceNumber={currentDiceNumber}>
                <StyledDot animate={animate} hide={currentDiceNumber === 1} />
                <StyledDot hide={true} />
                <StyledDot
                    animate={animate}
                    hide={currentDiceNumber === 1 || currentDiceNumber === 2 || currentDiceNumber === 3}
                />

                <StyledDot animate={animate} hide={currentDiceNumber !== 6} />
                <StyledDot
                    animate={animate}
                    hide={currentDiceNumber === 2 || currentDiceNumber === 4 || currentDiceNumber === 6}
                />
                <StyledDot animate={animate} hide={currentDiceNumber !== 6} />

                <StyledDot
                    animate={animate}
                    hide={currentDiceNumber === 1 || currentDiceNumber === 2 || currentDiceNumber === 3}
                />
                <StyledDot animate={animate} hide={true} />
                <StyledDot animate={animate} hide={currentDiceNumber === 1} />
            </StyledDice>
            <StyledButton disabled={animate || isDiceDisabled} onClick={() => onButtonClick()}>
                Roll Dice
            </StyledButton>
        </StyledDiceWrapper>
    );
};

Dice.propTypes = {
    rollDice: PropTypes.func.isRequired,
    currentDiceNumber: PropTypes.number.isRequired,
    isDiceDisabled: PropTypes.bool.isRequired,
    nextPlayer: PropTypes.number.isRequired,
    gameType: PropTypes.string.isRequired,
    aiHasRolled: PropTypes.bool.isRequired,
    setAiHasRolled: PropTypes.func.isRequired,
    player1Position: PropTypes.number.isRequired,
    player2Position: PropTypes.number.isRequired
};

export default Dice;
