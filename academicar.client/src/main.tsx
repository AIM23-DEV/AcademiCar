import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import '@fontsource-variable/outfit';
import '@fontsource-variable/noto-sans';
import './axiosConfig';
import {BrowserRouter} from "react-router-dom";
import {InitLocalization} from "./hooks/react_i18next.tsx";

InitLocalization().then(() =>
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>,
    ));
