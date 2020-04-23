import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${(props) => props.theme.colors.button};
    color: ${(props) => props.theme.colors.white};
    padding: 10px;
    width: ${(props) => (props.size === "big" ? "150px" : "100px")};
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    text-transform: capitalize;

    :disabled {
        pointer-events: none;
        opacity: 0.4;
        visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
    }

    :hover {
        background-color: ${(props) => props.theme.colors.button2};
    }
`;

const Button = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

Button.propTypes = {
    children: PropTypes.node.isRequired
};

export default Button;
