import {Outlet, Route} from 'react-router-dom';
import {IndexTripsPage} from "../pages/trips/IndexTripsPage.tsx";
import {ShowTripPage} from "../pages/trips/ShowTripPage.tsx";
import {CreateTripPage} from "../pages/trips/CreateTripPage.tsx";

// All routes are prefixed with /trips.
export default <Route key="/trips" path="/trips" element={<Outlet/>}>

    <Route key="" path="" element={<IndexTripsPage/>}/>,
    <Route key="create" path="create" element={<CreateTripPage/>}/>,
    <Route key=":id" path=":id" element={<ShowTripPage/>}/>,

</Route>;