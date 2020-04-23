import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    margin-bottom: 15px;
    color: ${(props) => props.theme.colors.secondary};

    a {
        color: ${(props) => props.theme.colors.secondary};
        text-decoration: none;
        margin: 0 5px;

        &:hover {
            color: ${(props) => props.theme.colors.text};
        }
    }

    small {
        margin: 2px;
        text-align: center;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <small>
                Game characters provided by the
                <a href="https://anapioficeandfire.com/" target="_blank" rel="noopener noreferrer">
                    anapioficeandfire.com
                </a>
                API
            </small>
            <small>
                Website created by Raymond Johannessen © 2020
                <a href="https://rajohan.no" target="_blank" rel="noopener noreferrer">
                    rajohan.no
                </a>
            </small>
        </StyledFooter>
    );
};

export default Footer;
