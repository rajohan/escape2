import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "../Shared/Logo";
import Button from "../Shared/Button";
import { LOCAL_MULTI_PLAYER, ONLINE_MULTI_PLAYER, SINGLE_PLAYER } from "../../constants/gameTypes";

const StyledHomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 3px;
    padding: 0 50px 40px 50px;
    box-shadow: ${(props) => props.theme.boxShadow.main};

    a {
        text-align: center;
    }

    h1 {
        font-size: 20px;
        max-width: 360px;
        font-family: Girassol, cursive;
        text-align: center;
        margin-bottom: 30px;
        color: ${(props) => props.theme.colors.secondary};
    }

    button {
        margin: 5px;
    }

    .aboutButton {
        margin-top: 40px;
    }
`;

const Home = ({ setGameType }) => {
    return (
        <React.Fragment>
            <StyledHomeWrapper>
                <StyledHome>
                    <Logo />
                    <h1>Will you be able to escape playing as a character from Game of Thrones?</h1>
                    <Link to="/pick" onClick={() => setGameType(SINGLE_PLAYER)}>
                        <Button size="big">Play vs the computer</Button>
                    </Link>
                    <Link to="/pick" onClick={() => setGameType(LOCAL_MULTI_PLAYER)}>
                        <Button size="big">Local 2 player</Button>
                    </Link>
                    <Link to="/lobby" onClick={() => setGameType(ONLINE_MULTI_PLAYER)}>
                        <Button size="big">Online 2 player</Button>
                    </Link>
                    <Link to="/about">
                        <Button size="big" className="aboutButton">
                            Rules / About
                        </Button>
                    </Link>
                </StyledHome>
            </StyledHomeWrapper>
        </React.Fragment>
    );
};

Home.propTypes = {
    setGameType: PropTypes.func.isRequired
};

export default Home;
