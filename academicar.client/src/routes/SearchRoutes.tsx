﻿import {Outlet, Route} from 'react-router-dom';
import {SearchTripsPage} from "../pages/search/SearchTripsPage.tsx";
import {SearchResultsPage} from "../pages/search/SearchResultsPage.tsx";
// All routes are prefixed with /search.
export default <Route key="/search" path="/search" element={<Outlet/>}>

    <Route key="" path="" element={<SearchTripsPage/>}/>,
    <Route key="result" path="result" element={<SearchResultsPage/>}/>,

</Route>;