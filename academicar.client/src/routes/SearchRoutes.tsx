import {Outlet, Route} from 'react-router-dom';
import {SearchTripsPage} from "../pages/search/SearchTripsPage.tsx";

// All routes are prefixed with /search.
export default <Route key="/search" path="/search" element={<Outlet/>}>

    <Route key="" path="" element={<SearchTripsPage/>}/>,

</Route>;