import { Outlet, Route } from 'react-router-dom';
import { SearchTripsPage } from "../pages/search/SearchTripsPage.tsx";
import { SearchResultsPage } from "../pages/search/SearchResultsPage.tsx";
import { SearchFilterPage } from "../pages/search/SearchFilterPage.tsx";
import Ratings from "../pages/search/Ratings.tsx";
import DriverList from "../pages/search/DriverList.tsx";

export default <Route key="searchRoute" path="/search" element={<Outlet/>}>

    <Route key="searchMainRoute" path="" element={<SearchTripsPage/>} />,
    <Route key="searchResultRoute" path="result" element={<SearchResultsPage/>} />,
    <Route key="searchFilterRoute" path="filter" element={<SearchFilterPage/>} />,
    <Route key="searchRatingsRoute" path="ratings/:driverId" element={<Ratings/>} />,
    <Route key="searchDriverRoute" path="driverlist" element={<DriverList/>} />,

</Route>;