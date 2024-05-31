import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Dashboard from "../pages/auth/Dashboard";
import AdminLogin from "../pages/auth/AdminLogin.tsx";

// Todo define admin routes!
// All routes are prefixed with /admin.

//<Route path="users" element={<IndexUsersPage />} />
const AdminPrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/admin-login" />;
    }

    /*if (!user.roles || !user.roles.includes('admin')) {
        return <Navigate to="/admin-login" />;
    }*/

    return <>{children}</>;
};

const AdminRoutes = (
    <Route path="/admin" element={<AdminPrivateRoute><Outlet /></AdminPrivateRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<AdminLogin />} />
    </Route>
);

export default AdminRoutes;