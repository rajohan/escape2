import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
`;

const HideScroll = createGlobalStyle`
    body {
        overflow: hidden;
    }
`;

const StyledModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${(props) => props.theme.colors.primary};
    z-index: 10000;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        padding: 10px 20px 20px 20px;
    }

    button {
        margin: 0 20px 20px 20px;
    }
`;

const Header = styled.div`
    background-color: ${(props) => props.theme.colors.secondary};
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    text-transform: capitalize;
`;

const Modal = (props) => {
    return (
        <Wrapper isHidden={props.isHidden}>
            {!props.isHidden && <HideScroll />}
            <StyledModal>
                <Header>
                    <h1>{props.header || "Ooooops!"}</h1>
                </Header>
                <p>{props.children}</p>
                {props.button === false || (
                    <Button onClick={props.onConfirm} size="big">
                        Ok
                    </Button>
                )}
            </StyledModal>
        </Wrapper>
    );
};

Modal.propTypes = {
    isHidden: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onConfirm: PropTypes.func,
    header: PropTypes.string,
    button: PropTypes.bool
};

export default Modal;
