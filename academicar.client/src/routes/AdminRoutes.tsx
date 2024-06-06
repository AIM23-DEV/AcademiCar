import React from 'react';
import { Outlet, Route } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Dashboard from "../pages/auth/Dashboard";
import AdminLogin from "../pages/auth/AdminLogin.tsx";
import {IndexUsersPage} from "../pages/admin/IndexUsersPage.tsx";
import {ShowUserPage} from "../pages/admin/ShowUserPage.tsx";

// Todo define admin routes!
// All routes are prefixed with /admin.

//<Route path="users" element={<IndexUsersPage />} />
const AdminPrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Route path="login" element={<AdminLogin />} />;
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
        <Route key="users" path="users" element={<IndexUsersPage/>} />,
        <Route key="users/:id" path="users/:id" element={<ShowUserPage/>} />,
    </Route>
);

export default AdminRoutes;