import {Outlet, Route} from "react-router-dom";

// Todo define admin routes!
// All routes are prefixed with /admin.
export default <Route key="/admin" path="/admin" element={<Outlet/>}>

    {/* <Route key="users" path="users" element={<IndexUsersPage/>}/>, */}

</Route>;