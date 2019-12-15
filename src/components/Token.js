import React from "react";
import styled from "styled-components";

const StyledToken = styled.img`
    width: 30px;
`;

const Token = props => {
    return (
        <StyledToken src={props.player === 1 ? require("../img/token1.png") : require("../img/token2.png")} />
    );
};

export default Token;