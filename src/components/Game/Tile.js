import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Token from "./Token";

const StyledTile = styled.div`
    display: flex;
    justify-content: center;
    background: ${(props) =>
        props.first === true
            ? "url(" + require("../../img/arrow.png") + ") center no-repeat," + props.theme.gradients.startFinish
            : (props) =>
                  props.last === true
                      ? "url(" +
                        require("../../img/trophy.png") +
                        ") center no-repeat," +
                        props.theme.gradients.startFinish
                      : props.trap === true
                      ? "url(" +
                        require("../../img/questionmark.png") +
                        ") center no-repeat," +
                        props.theme.gradients.trap
                      : props.theme.gradients.tile};
    color: ${(props) => props.theme.colors.white};
    font-size: 50px;
    padding: 20px;
    height: 50px;
`;

const Tile = (props) => {
    const { tileNumber, player1Position, player2Position, traps } = props;

    return (
        <StyledTile first={tileNumber === 1} last={tileNumber === 30} trap={traps.includes(tileNumber)}>
            {(player1Position === tileNumber || (player1Position >= 30 && tileNumber === 30)) && <Token player={1} />}
            {(player2Position === tileNumber || (player2Position >= 30 && tileNumber === 30)) && <Token player={2} />}
        </StyledTile>
    );
};

Tile.propTypes = {
    tileNumber: PropTypes.number.isRequired,
    player1Position: PropTypes.number.isRequired,
    player2Position: PropTypes.number.isRequired,
    traps: PropTypes.array.isRequired
};

export default Tile;
