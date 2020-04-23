import React from "react";
import styled from "styled-components";

const StyledImg = styled.img`
    max-width: 400px;
    width: 100%;
    margin-top: 40px;
    display: block;
    align-self: center;
`;

const Logo = () => {
    return <StyledImg src={require("../../img/logo.png")} alt="The Escape" />;
};

export default Logo;
