import {Outlet, Route} from "react-router-dom";
import {IndexUsersPage} from "../pages/admin/IndexUsersPage.tsx";
import {ShowUserPage} from "../pages/admin/ShowUserPage.tsx";

// Todo define admin routes!
// All routes are prefixed with /admin.
export default <Route key="/admin" path="/admin" element={<Outlet/>}>

    <Route key="users" path="users" element={<IndexUsersPage/>}/>,
    <Route key="users/:id" path="users/:id" element={<ShowUserPage/>}/>,

</Route>;