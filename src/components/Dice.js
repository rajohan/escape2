import React, {useState} from "react";
import styled, {css, keyframes} from "styled-components";

import Button from "./Button";

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
    background: #fff;
    box-shadow: inset 0 0 5px #ccc;
    border-radius: 5px;
    padding: 10px;
    animation: ${props => props.animate ? css`${rotate} 1s ease 0s` : "none"};
    margin-right: 10px;
`;

const StyledDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50px;
    background: #2d2d2d;
    visibility: ${props => props.hide === true ? "hidden" : "visible"};
    animation: ${props => props.animate ? css`${blur} 2s ease 0s` : "none"};
`;

const Dice = props => {
    const {rollDice, currentDiceNumber} = props;
    const [animate, setAnimate] = useState(false);

    const onButtonClick = () => {
        rollDice(Math.ceil((Math.random() * 6)));
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 1000);
    };

    return (
        <StyledDiceWrapper>
            <StyledDice animate={animate} diceNumber={currentDiceNumber}>
                <StyledDot animate={animate} hide={currentDiceNumber === 1}/>
                <StyledDot hide={true} />
                <StyledDot animate={animate} hide={currentDiceNumber === 1 || currentDiceNumber === 2 || currentDiceNumber === 3} />

                <StyledDot animate={animate} hide={currentDiceNumber !== 6}/>
                <StyledDot animate={animate} hide={currentDiceNumber === 2 || currentDiceNumber === 4 || currentDiceNumber === 6} />
                <StyledDot animate={animate} hide={currentDiceNumber !== 6}/>

                <StyledDot animate={animate} hide={currentDiceNumber === 1 || currentDiceNumber === 2 || currentDiceNumber === 3} />
                <StyledDot animate={animate} hide={true} />
                <StyledDot animate={animate} hide={currentDiceNumber === 1} />
            </StyledDice>
            <Button disabled={animate} onClick={() => onButtonClick()}>Roll Dice</Button>
        </StyledDiceWrapper>
    );
};

export default Dice;