import React from "react";
import styled from "styled-components";

import Tile from "./Tile";
import {PRIMARY_COLOR} from "../constants/colors";

const StyledBoardWrapper = styled.div`
    perspective: 800px;
    margin-bottom: 20px;
    width: 900px;
    margin-top: -20px;
`;

const StyledOutline = styled.div`
    background: ${PRIMARY_COLOR};
    padding: 10px;
    transform: rotateX(30deg);
`;

const StyledBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1px;
    background-color: #000;
    border: 1px solid #000;
`;

const Board = props => {
    const {player1Position, player2Position} = props;

    const Tiles = () => {
        const tileArray = [];

        for(let i = 1; i <= 30; i++) {
            tileArray.push(
                <Tile key={i}
                      tileNumber={i}
                      traps={props.traps}
                      player1Position={player1Position}
                      player2Position={player2Position}
                />);
        }

        return tileArray;
    };

    return (
        <StyledBoardWrapper>
            <StyledOutline>
                <StyledBoard>
                    <Tiles />
                </StyledBoard>
            </StyledOutline>
        </StyledBoardWrapper>
    );
};

export default Board;