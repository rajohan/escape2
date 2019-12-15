import React from "react";
import styled from "styled-components";

import {PRIMARY_COLOR, SECONDARY_COLOR} from "../constants/colors";
import Button from "./Button";

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    background-color: rgba(0,0,0,0.8);
    width: 100vw;
    height: 100vh;
    visibility: ${props => props.isHidden ? "hidden" : "visible"};
`;

const StyledModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${PRIMARY_COLOR};
    z-index: 10000;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    p {
        padding: 20px;
    }
    
    button {
        margin: 20px;
    }
`;

const Header = styled.div`
    background-color: ${SECONDARY_COLOR};
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Modal = props => {
    return (
        <Wrapper isHidden={props.isHidden}>
            <StyledModal>
                <Header>
                    <h1>Ooooops!</h1>
                </Header>
                <p>{props.content}</p>
                <Button onClick={props.confirmTrap} size="big">Ok</Button>
            </StyledModal>
        </Wrapper>
    );
};

export default Modal;