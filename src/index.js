import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom"

import App from "./components/App";

const Root = () => {
    return (
        <HashRouter basename={"/school/escape"}>
            <App />
        </HashRouter>
    );
};

ReactDOM.render(<Root/>, document.getElementById("root"));