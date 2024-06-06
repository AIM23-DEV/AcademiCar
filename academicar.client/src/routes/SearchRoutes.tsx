import {Outlet, Route} from 'react-router-dom';
import {SearchTripsPage} from "../pages/search/SearchTripsPage.tsx";
import Ratings from "../pages/search/Ratings.tsx";
import DriverList from "../pages/search/DriverList.tsx";

// All routes are prefixed with /search.
export default <Route key="/search" path="/search" element={<Outlet/>}>

    <Route key="" path="" element={<SearchTripsPage/>}/>,
    <Route key="" path="ratings/:driverId" element={<Ratings/>}/>,
    <Route key="" path="driverlist" element={<DriverList/>}/>,

</Route>;