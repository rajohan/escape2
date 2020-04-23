import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "../Shared/Button";
import Header from "../Shared/Header";
import { ONLINE_MULTI_PLAYER } from "../../constants/gameTypes";
import { PLAYER_1, PLAYER_2 } from "../../constants/player";

const StyledCard = styled.div`
    border-radius: 3px;
    background-color: ${(props) => props.theme.colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    box-shadow: ${(props) => props.theme.boxShadow.main};
    margin-bottom: 15px;
    padding-bottom: 20px;
`;

const CardWrapper = styled.div`
    padding-bottom: 10px;
`;

const CardDetails = styled.div`
    padding: 10px;
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    text-transform: capitalize;

    span {
        font-weight: 700;
        padding-bottom: 2px;
        margin-bottom: 5px;
        align-self: center;
    }

    div {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
    }

    div:not(:last-of-type) {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid ${(props) => props.theme.colors.tertiary};
    }
`;

const Card = (props) => {
    const { name, gender, titles, born, aliases } = props.data;

    const details = (
        <CardWrapper>
            <div>
                <span>Gender</span> {gender}
            </div>
            <div>
                <span>Title</span> {titles[0]}
            </div>
            <div>
                <span>Alias</span> {aliases[0]}
            </div>
            <div>
                <span>Born</span> {born}
            </div>
        </CardWrapper>
    );

    return (
        <StyledCard>
            <Header>{name}</Header>
            <CardDetails>
                {props.picks.filter((pick) => pick.name === props.data.name).length > 0
                    ? props.gameType === ONLINE_MULTI_PLAYER
                        ? props.player === PLAYER_1
                            ? `Already picked by ${props.username}`
                            : `Already picked by ${props.opponent}`
                        : "Already picked by Player 1"
                    : details}
            </CardDetails>
            <Button
                disabled={
                    props.picks.filter((pick) => pick.name === props.data.name).length > 0 ||
                    (props.gameType === ONLINE_MULTI_PLAYER && props.picks.length < 1 && props.player === PLAYER_2) ||
                    (props.gameType === ONLINE_MULTI_PLAYER && props.picks.length > 0 && props.player === PLAYER_1)
                }
                isHidden={props.picks.filter((pick) => pick.name === props.data.name).length > 0}
                size="big"
                onClick={() => props.onPick(props.data)}
            >
                Pick
            </Button>
        </StyledCard>
    );
};

Card.propTypes = {
    data: PropTypes.object.isRequired,
    picks: PropTypes.array.isRequired,
    gameType: PropTypes.string.isRequired,
    player: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onPick: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    opponent: PropTypes.string.isRequired
};

export default Card;
