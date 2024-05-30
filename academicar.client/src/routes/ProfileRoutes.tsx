import {Outlet, Route} from 'react-router-dom';
import {IndexProfilePage} from "../pages/profile/IndexProfilePage.tsx";

// All routes are prefixed with /profile.
export default <Route key="/profile" path="/profile" element={<Outlet/>}>

    <Route key="" path="" element={<IndexProfilePage/>}/>,

</Route>;