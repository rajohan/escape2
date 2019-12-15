import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import styled from "styled-components";

import Card from "./Card";
import {SECONDARY_COLOR} from "../constants/colors";

const StyledPick = styled.div`
    max-width: 900px;
    width: 100%;
    text-align: center;
    margin: 20px;
    display: flex;
    flex-direction: column;
`;

const StyledHeader = styled.h1`
    background-color: ${SECONDARY_COLOR};
    display: flex;
    padding: 20px;
    justify-content: center;
    box-shadow: 0 0 40px 0 rgba(255,255,255,0.2);
    margin: 20px;
`;

const CardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
    justify-items: center;
`;

const Logo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const StyledImg = styled.img`
    max-width: 400px;
    width: 100%;
    margin-top: 20px;
    display: block;
`;



const Pick = props => {
    const [characters, setCharacters] = useState([]);
    const {picks, setPicks} = props;

    async function fetchData(page) {
        const data = await fetch(`https://anapioficeandfire.com/api/characters?page=${page}&pageSize=50`);
        data
            .json()
            .then(res => {
                res = res.filter(char => char.name.length > 1 && char.titles.length > 1 && char.born.length > 1 && char.aliases.length > 1);
                const randomNum = Math.ceil((Math.random() * res.length));
                setCharacters(prevCharacters => [...prevCharacters, res[randomNum-1]]);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        for(let i = 1; i <= 10; i++) {
            fetchData(i);
        }
    }, []);

    const renderCards = () => {
        let i = 0;
        return characters.map(char => {
            i++;
            return <Card key={i} picks={picks} onPick={setPicks} data={char} />
        });
    };

    return (
        picks.length <= 1
            ?
            <>
            <StyledPick>
                <Logo>
                    <StyledImg src={require("../img/logo.png")} alt="The Escape"/>
                </Logo>
                <StyledHeader>Player {picks.length < 1 ? "1" : "2"} pick your character</StyledHeader>
                <CardsWrapper>
                    {renderCards()}
                </CardsWrapper>
            </StyledPick>
            </>
            :
            <Redirect to="/play" />
    );
};

export default Pick;