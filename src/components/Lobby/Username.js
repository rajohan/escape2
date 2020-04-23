import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledInputWrapper = styled.span`
    display: block;
    text-align: center;

    input {
        width: 200px;
        padding: 10px;
        outline: none;
    }
`;

const StyledError = styled.span`
    display: block;
    color: ${(props) => props.theme.colors.error};
    margin: 20px 0 0 0;
    text-align: center;
`;

const Username = ({ username, setUsername, usernameError, handleSetUsername }) => {
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <React.Fragment>
            <StyledInputWrapper>
                <input
                    type="text"
                    placeholder="Your username..."
                    value={username}
                    onKeyDown={({ key }) => key === "Enter" && handleSetUsername()}
                    onChange={handleUsernameChange}
                />
                {usernameError.length > 0 && <StyledError>{usernameError}</StyledError>}
            </StyledInputWrapper>
        </React.Fragment>
    );
};

Username.propTypes = {
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    usernameError: PropTypes.string.isRequired,
    handleSetUsername: PropTypes.func.isRequired
};

export default Username;
