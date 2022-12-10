import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import Main from "./Main";
import Loading from "./components/Loading";

axios.defaults.withCredentials = true;
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <React.Suspense fallback={<Loading />}>
            <Main />
        </React.Suspense>
    </React.StrictMode>
);
