import {Outlet, Route} from 'react-router-dom';
import {SearchTripsPage} from "../pages/search/SearchTripsPage.tsx";
import {SearchResultsPage} from "../pages/search/SearchResultsPage.tsx";
import {SearchFilterPage} from "../pages/search/SearchFilterPage.tsx";
import Ratings from "../pages/search/Ratings.tsx";
import DriverList from "../pages/search/DriverList.tsx";

// All routes are prefixed with /search.
export default <Route key="/search" path="/search" element={<Outlet/>}>

    <Route key="" path="" element={<SearchTripsPage/>}/>,
    <Route key="result" path="result" element={<SearchResultsPage/>}/>,
    <Route key="filter" path="filter" element={<SearchFilterPage/>}/>,
    <Route key="" path="ratings/:driverId" element={<Ratings/>}/>,
    <Route key="" path="driverlist" element={<DriverList/>}/>,

</Route>;