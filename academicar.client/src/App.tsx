import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import {AuthProvider} from './AuthContext';
import {HomePage} from './pages/HomePage';

import AuthenticationRoutes from "./routes/AuthenticationRoutes.tsx";
import SearchRoutes from "./routes/SearchRoutes.tsx";
import TripRoutes from "./routes/TripRoutes.tsx";
import ChatRoutes from "./routes/ChatRoutes.tsx";
import ProfileRoutes from "./routes/ProfileRoutes.tsx";
import AdditionalRoutes from "./routes/AdditionalRoutes.tsx";
import AdminRoutes from "./routes/AdminRoutes.tsx";

// Todo remove when obsolete
const App: React.FC = () => {
    return (
        <AuthProvider>
            <I18nextProvider i18n={i18next}>
                    <Routes>
                        <Route index key="homeRoute" element={<HomePage />} />
                        
                        {AuthenticationRoutes}
                        {SearchRoutes}
                        {TripRoutes}
                        {ChatRoutes}
                        {ProfileRoutes}
                        {AdminRoutes}
                        {AdditionalRoutes}
                    </Routes>
            </I18nextProvider>
        </AuthProvider>
    );
};

export default App;
