import { Outlet, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../AuthContext.tsx";
import { AdminLogin } from "../pages/auth/AdminLogin.tsx"
import Dashboard from "../pages/auth/Dashboard.tsx";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return user ? <>{children}</> : <Navigate to="/" />;
};

const AuthenticationRoutes = (
    <Route key="authRoute" path="/auth" element={<Outlet />}>
        
        <Route index key="authLoginRoute" path="login" element={<AdminLogin />} />
        <Route key="authDashboardRoute" path="dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
        
    </Route>
);

export default AuthenticationRoutes;