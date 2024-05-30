import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import { AuthProvider, useAuth } from './AuthContext';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';

import AuthenticationRoutes from "./routes/AuthenticationRoutes.tsx";
import SearchRoutes from "./routes/SearchRoutes.tsx";
import TripRoutes from "./routes/TripRoutes.tsx";
import ChatRoutes from "./routes/ChatRoutes.tsx";
import ProfileRoutes from "./routes/ProfileRoutes.tsx";
import AdditionalRoutes from "./routes/AdditionalRoutes.tsx";
import AdminRoutes from "./routes/AdminRoutes.tsx";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return user ? <>{children}</> : <Navigate to="/" />;
};

const AdminPrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/admin-login" />;
    }

    /* if (!user.Roles || !user.Roles.includes('admin')) {
        return <Navigate to="/admin-login" />;
    }*/

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <I18nextProvider i18n={i18next}>
                <Router>
                    <Routes>
                        {/* Todo remove when obsolete */}
                        <Route index element={<HomePage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route
                            path="/admin/dashboard"
                            element={
                                <AdminPrivateRoute>
                                    <Dashboard />
                                </AdminPrivateRoute>
                            }
                        />

                        {/* Routes are saved in separate files. */}
                        {AuthenticationRoutes}
                        {SearchRoutes}
                        {TripRoutes}
                        {ChatRoutes}
                        {ProfileRoutes}
                        {AdminRoutes}
                        {AdditionalRoutes}
                    </Routes>
                </Router>
            </I18nextProvider>
        </AuthProvider>
    );
};

export default App;
