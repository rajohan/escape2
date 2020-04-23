import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledHeader = styled.h1`
    background-color: ${(props) => props.theme.colors.secondary};
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    padding: 5px;
    align-self: stretch;
    margin: 0;
`;

const Header = (props) => {
    return <StyledHeader>{props.children}</StyledHeader>;
};

Header.propTypes = {
    children: PropTypes.node.isRequired
};

export default Header;
