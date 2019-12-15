import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import {PRIMARY_COLOR} from "../constants/colors";
import Button from "./Button";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    background-color: ${PRIMARY_COLOR};
    padding: 50px;
    border-radius: 3px;
    box-shadow: 0 0 40px 0 rgba(255,255,255,0.2);
    
    a {
        text-align: center;
    }
`;

const StyledImg = styled.img`
    max-width: 400px;
    width: 100%;
    margin: 20px 0;
    display: block;
`;

const Home = () => {
    return (
        <Wrapper>
            <StyledImg src={require("../img/logo.png")} alt="The Escape"/>
            <Link to="/pick"><Button size="big">Play</Button></Link>
        </Wrapper>
    );
};

export default Home;