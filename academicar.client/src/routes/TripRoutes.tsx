import {Outlet, Route} from 'react-router-dom';
import {IndexTripsPage} from "../pages/trips/IndexTripsPage.tsx";
import {ShowTripPage} from "../pages/trips/ShowTripPage.tsx";
import {CreateTripPage} from "../pages/trips/CreateTripPage.tsx";
import {DriverTripHistoryPage} from "../pages/trips/DriverTripHistoryPage.tsx";
import {PassengerTripHistoryPage} from "../pages/trips/PassengerTripHistoryPage.tsx";

// All routes are prefixed with /trips.
export default <Route key="/trips" path="/trips" element={<Outlet/>}>

    <Route key="" path="" element={<IndexTripsPage/>}/>,
    <Route key="create" path="create" element={<CreateTripPage/>}/>,
    <Route key=":id" path=":id" element={<ShowTripPage/>}/>,
    <Route key="history/driver" path="history/driver" element={<DriverTripHistoryPage/>}/>,
    <Route key="history/passenger" path="history/passenger" element={<PassengerTripHistoryPage/>}/>,
    
</Route>;