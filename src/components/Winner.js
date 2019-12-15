import React from "react";
import styled, {keyframes, css} from "styled-components";

import {PRIMARY_COLOR} from "../constants/colors";
import Button from "./Button";

const move = (y, x, odd) => keyframes`
    0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
    }
  
    100% {
        transform: translateY(${x}px) translateX(${odd ? -y : y}px);
        opacity: 0;
    }
`;

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    background-color: rgba(0,0,0,0.8);
    width: 100vw;
    height: 100vh;
`;

const StyledWinner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${PRIMARY_COLOR};
    z-index: 10000;
    width: 600px;
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    img {
        margin-bottom: 20px;
    }
    
    button {
        margin-top: 20px;
    }
`;

const Confetti = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(0, -50%);
    background-color: ${props => props.color};
    padding: 5px;
    border-radius: 2px;
    animation: ${props => css`${move(props.y, props.x, props.odd)} 3s ease infinite`};
`;

const randomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
};

const renderConfetti = x => {
    const test = [];
    for(let i = 0; i < x; i++) {
        test.push(<Confetti key={i} y={Math.random() * 500} x={(Math.random() * 500) + 100} odd={i % 2 === 0} color={randomColor()} />);
    }

    return test;
};

const Winner = props => {
    return (
        <>
            {props.isHidden ? "" :
                <Wrapper>
                    <StyledWinner>
                        <img src={require("../img/winner.png")} alt="Winner Trophy" />
                        {props.content.name} (player{props.content.player}) WON!
                        <a href="./"><Button onClick={props.confirmWinner} size="big">Confirm</Button></a>
                        <div>
                            {renderConfetti(180)}
                        </div>
                    </StyledWinner>
                </Wrapper>
            }
        </>
    );
};

export default Winner;