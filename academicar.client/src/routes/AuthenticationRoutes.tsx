import {Outlet, Route} from 'react-router-dom';
import {LoginPage} from "../pages/auth/LoginPage.tsx";
import { Navigate } from 'react-router-dom';
import {useAuth} from "../AuthContext.tsx";
import Dashboard from "../pages/auth/Dashboard.tsx";

// All routes are prefixed with /auth.


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return user ? <>{children}</> : <Navigate to="/" />;
};

const AuthenticationRoutes = (
    <Route path="/auth" element={<Outlet />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard"
            element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            }
        />
    </Route>
);

export default AuthenticationRoutes;