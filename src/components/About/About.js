import React from "react";
import styled from "styled-components";

import Logo from "../Shared/Logo";
import Header from "../Shared/Header";
import { Link } from "react-router-dom";

const StyledAbout = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 700px;
    width: 100%;
    margin-bottom: 30px;
    letter-spacing: 1px;

    .goBack {
        display: flex;
        align-items: center;

        span {
            margin: 0 5px 3px 0;
        }
    }

    a {
        color: ${(props) => props.theme.colors.text};
        text-decoration: none;
        margin: 0 5px;

        &:hover {
            color: ${(props) => props.theme.colors.secondary};
        }
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: ${(props) => props.theme.boxShadow.main};
        align-items: center;
        background-color: ${(props) => props.theme.colors.primary};

        &:first-of-type {
            margin-top: 20px;
        }

        p {
            padding: 0 15px;
            max-width: 500px;

            &:first-of-type {
                margin-top: 30px;
            }

            &:last-of-type {
                margin-bottom: 30px;
            }
        }
    }
`;

const About = () => {
    return (
        <StyledAbout>
            <Logo />
            <Link to="/" className="goBack">
                <span>&lt;</span> Go Back
            </Link>
            <div>
                <Header>About</Header>
                <p>
                    You are playing as a Game Of Thrones character and are trapped in a dark and dangerous place. Will
                    you be able to escape?
                </p>
                <p>
                    The game was first made as a school project while I was studying frontend developing at Noroff in
                    2019. It then got new features added as well as a rework as part of a portfolio project at Noroff in
                    2020.
                </p>
                <p>
                    The Game Of Thrones character details are provided by the
                    <a href="https://anapioficeandfire.com/" target="_blank" rel="noopener noreferrer">
                        anapioficeandfire.com
                    </a>
                    API
                </p>
            </div>
            <div>
                <Header>Rules</Header>
                <p>
                    The rules of the game is rather simple. The game consists of 30 tiles, 5 traps, 2 players and a
                    dice. You have 3 choices of how you want to play. Alone vs the computer, a local 2 player or an
                    online 2 player. Both players throw a dice in turns and the first player to reach the finish mark or
                    past it wins the game.
                </p>
                <p>
                    The game starts off with each player selecting 1 of 10 random Game Of Throne characters to play as.
                    Next each player throws the dice in turns and the players token move according to the dice rolls.
                </p>
                <p>
                    If a player throws a 6 an extra dice throw will be rewarded. That is if the player dont step on a
                    trap, in that case the extra dice throw will not be rewarded.
                </p>
                <p>
                    It is 5 traps randomly placed throughout the game board. Some of them lets the player move a couple
                    of tiles forward but, most will punish the player and move the token some tiles backwards. If the
                    player gets really unlucky the trap might bring the player token onto a new trap and result in a
                    double punishment.
                </p>
            </div>
        </StyledAbout>
    );
};

export default About;
