import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledToken = styled.img`
    width: 30px;
`;

const Token = (props) => {
    return <StyledToken src={props.player === 1 ? require("../../img/token1.png") : require("../../img/token2.png")} />;
};

Token.propTypes = {
    player: PropTypes.number.isRequired
};

export default Token;
