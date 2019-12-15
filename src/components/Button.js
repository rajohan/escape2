import React from "react";
import styled from "styled-components";

import {BUTTON_COLOR, BUTTON_COLOR2} from "../constants/colors";

const StyledButton = styled.button`
    background-color: ${BUTTON_COLOR};
    color: #fff;
    padding: 10px;
    width: ${props => props.size === "big" ? "150px" : "100px"};
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    font-family: 'Girassol', cursive;
    
    :disabled {
        pointer-events:none;
        visibility: ${props => props.isHidden ? "hidden" : "visible"};
    }
    
    :hover {
        background-color: ${BUTTON_COLOR2};
    }
`;

const Button = props => {
    return (
        <StyledButton {...props}>
            {props.children}
        </StyledButton>
    );
};

export default Button;