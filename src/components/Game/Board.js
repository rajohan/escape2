import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Tile from "./Tile";

const StyledBoardWrapper = styled.div`
    perspective: 800px;
    margin-bottom: 20px;
    width: 900px;
    margin-top: -20px;
`;

const StyledOutline = styled.div`
    background: ${(props) => props.theme.colors.primary};
    padding: 10px;
    transform: rotateX(30deg);
`;

const StyledBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1px;
    background-color: ${(props) => props.theme.colors.black};
    border: 1px solid ${(props) => props.theme.colors.black};
`;

const Board = (props) => {
    const { player1Position, player2Position } = props;

    const Tiles = () => {
        const tileArray = [];

        for (let i = 1; i <= 30; i++) {
            tileArray.push(
                <Tile
                    key={i}
                    tileNumber={i}
                    traps={props.traps}
                    player1Position={player1Position}
                    player2Position={player2Position}
                />
            );
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

Board.propTypes = {
    player1Position: PropTypes.number.isRequired,
    player2Position: PropTypes.number.isRequired,
    traps: PropTypes.array.isRequired
};

export default Board;
