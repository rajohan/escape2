import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Socket } from "react-socket-io";

import App from "./components/App";

const Root = () => {
    const uri = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080";

    return (
        <BrowserRouter>
            <Socket uri={uri} options={{ transports: ["websocket"] }}>
                <App />
            </Socket>
        </BrowserRouter>
    );
};

ReactDOM.render(<Root />, document.getElementById("root"));
