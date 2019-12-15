import React, {useState} from "react";
import {Switch, Route} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

import Home from "./Home";
import Pick from "./Pick";
import Game from "./Game";

const GlobalStyle = createGlobalStyle`
    body {
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAHElEQVQYV2NU1khLY8ABGEGSd2/MmoVNftBJAgDgphkfYMpkiQAAAABJRU5ErkJggg==") repeat;
        background-color: black;
        color: #fff;
        margin: 0;
        padding: 0;
        max-width: 100vw;
        overflow-x: hidden;
    }
    
    #root {
        width: 100vw;
        display: flex;
        justify-content: center;
        min-height: 100vh;
    }
`;

const App = () => {
    const [picks, setPicks] = useState([]);

    return (
        <React.Fragment>
            <GlobalStyle/>
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/pick">
                    <Pick picks={picks} setPicks={setPicks}/>
                </Route>
                <Route path="/play">
                    <Game picks={picks}/>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default App;