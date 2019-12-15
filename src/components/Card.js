import React from "react";
import styled from "styled-components";

import {SECONDARY_COLOR, PRIMARY_COLOR, TERTIARY_COLOR} from "../constants/colors";
import Button from "./Button";

const StyledCard = styled.div`
    border-radius: 3px;
    background-color: ${PRIMARY_COLOR};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    box-shadow: 0 0 40px 0 rgba(255,255,255,0.2);
    margin-bottom: 15px;
    padding-bottom: 20px;
`;

const CardHeader = styled.div`
    background-color: ${SECONDARY_COLOR};
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    padding: 5px;
    align-self: stretch;
`;

const CardWrapper = styled.div`
    padding-bottom: 10px;
`;

const CardDetails = styled.div`
    padding: 10px;
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    
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
        border-bottom: 1px solid ${TERTIARY_COLOR};
    }
`;

const Card = props => {

    const {name, gender, titles, born, aliases} = props.data;

    const details = <CardWrapper>
        <div><span>Gender</span> {gender}</div>
        <div><span>Title</span> {titles[0]}</div>
        <div><span>Alias</span> {aliases[0]}</div>
        <div><span>Born</span> {born}</div>
    </CardWrapper>;

    return (
        <StyledCard>
            <CardHeader>{name}</CardHeader>
            <CardDetails>
                {props.picks.includes(props.data) ? "Already picked by Player 1" : details}
            </CardDetails>
            <Button
                disabled={props.picks.includes(props.data)}
                isHidden={props.picks.includes(props.data)}
                size="big" onClick={() => props.onPick(prevPicks => [...prevPicks, props.data])}>
                Pick
            </Button>
        </StyledCard>
    );
};

export default Card;