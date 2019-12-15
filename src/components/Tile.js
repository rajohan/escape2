import React from "react";
import styled from "styled-components";

import {START_FINISH_GRADIENT, TILE_GRADIENT, TRAP_GRADIENT} from "../constants/colors";
import Token from "./Token";

const StyledTile = styled.div`
    display: flex;
    justify-content: center;
    background: ${props => props.first === true ? "url(" + require("../img/arrow.png") + ") no-repeat," + START_FINISH_GRADIENT :
                        props => props.last === true ? "url(" + require("../img/trophy.png") + ") no-repeat," + START_FINISH_GRADIENT : 
                        props.trap === true ? "url(" + require("../img/questionmark.png") + ") no-repeat," + TRAP_GRADIENT : TILE_GRADIENT};
    background-position: center;
    color: #fff;
    font-size: 50px;
    padding: 20px;
    height: 50px;
`;

const Tile = props => {
    const {tileNumber, player1Position, player2Position} = props;

    return (
        <StyledTile first={tileNumber === 1} last={tileNumber===30} trap={props.traps.includes(tileNumber)}>
            {((player1Position === tileNumber) || (player1Position >= 30 && tileNumber === 30)) && <Token player={1} />}
            {((player2Position === tileNumber) || (player2Position >= 30 && tileNumber === 30)) && <Token player={2} />}
        </StyledTile>
    );
};

export default Tile;