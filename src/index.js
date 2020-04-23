import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Socket } from "react-socket-io";

import App from "./components/App";

const Root = () => {
    return (
        <BrowserRouter>
            <Socket uri={"http://localhost:8080"} options={{ transports: ["websocket"] }}>
                <App />
            </Socket>
        </BrowserRouter>
    );
};

ReactDOM.render(<Root />, document.getElementById("root"));
