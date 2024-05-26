import {Outlet, Route} from 'react-router-dom';
import {LoginPage} from "../pages/auth/LoginPage.tsx";

// All routes are prefixed with /auth.
export default <Route key="/auth" path="/auth" element={<Outlet/>}>

    <Route key="login" path="login" element={<LoginPage/>}/>,

</Route>;