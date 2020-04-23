import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle` 
    * {
        font-family: ${(props) => props.theme.font.main};
    }
    
    body {
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAHElEQVQYV2NU1khLY8ABGEGSd2/MmoVNftBJAgDgphkfYMpkiQAAAABJRU5ErkJggg==") repeat;
        background-color: ${(props) => props.theme.colors.black};
        color: ${(props) => props.theme.colors.text};
        margin: 0;
        padding: 0;
        max-width: 100vw;
        overflow-x: hidden;
        font-size: ${(props) => props.theme.font.size};
        font-weight: ${(props) => props.theme.font.weight};
    }
    
    #root {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
    }
`;
