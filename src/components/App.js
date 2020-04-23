import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "../themes/globalStyles";
import { defaultTheme } from "../themes/defaultTheme";
import Home from "./Home/Home";
import Pick from "./Pick/Pick";
import Lobby from "./Lobby/Lobby";
import Game from "./Game/Game";
import About from "./About/About";
import Footer from "./Shared/Footer";

const App = () => {
    const [picks, setPicks] = useState([]);
    const [traps, setTraps] = useState([]);
    const [gameType, setGameType] = useState("");
    const [gameRoom, setGameRoom] = useState("");
    const [username, setUsername] = useState("");
    const [player, setPlayer] = useState("");
    const [opponent, setOpponent] = useState("");

    return (
        <React.Fragment>
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyles />
                <Switch>
                    <Route path="/" exact>
                        <Home setGameType={setGameType} />
                    </Route>
                    <Route path="/pick">
                        <Pick
                            picks={picks}
                            traps={traps}
                            setTraps={setTraps}
                            setPicks={setPicks}
                            gameRoom={gameRoom}
                            player={player}
                            gameType={gameType}
                            username={username}
                            opponent={opponent}
                            setOpponent={setOpponent}
                        />
                    </Route>
                    <Route path="/lobby">
                        <Lobby
                            gameType={gameType}
                            username={username}
                            setUsername={setUsername}
                            setGameRoom={setGameRoom}
                            setPlayer={setPlayer}
                        />
                    </Route>
                    <Route path="/play">
                        <Game
                            picks={picks}
                            traps={traps}
                            gameType={gameType}
                            gameRoom={gameRoom}
                            player={player}
                            username={username}
                            setPicks={setPicks}
                            opponent={opponent}
                        />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
                <Footer />
            </ThemeProvider>
        </React.Fragment>
    );
};

export default App;
