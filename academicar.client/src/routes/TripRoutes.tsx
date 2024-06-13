import {Outlet, Route} from 'react-router-dom';
import {IndexTripsPage} from "../pages/trips/IndexTripsPage.tsx";
import {ShowTripPage} from "../pages/trips/ShowTripPage.tsx";
import {DriverTripHistoryPage} from "../pages/trips/DriverTripHistoryPage.tsx";
import {PassengerTripHistoryPage} from "../pages/trips/PassengerTripHistoryPage.tsx";
import {CreateTripPage1} from "../pages/create/CreateTripPage1.tsx";
import {CreateTripPage2} from "../pages/create/CreateTripPage2.tsx";
import {CreateTripPage3} from "../pages/create/CreateTripPage3.tsx";
import {CreateTripPage4} from "../pages/create/CreateTripPage4.tsx";
import {UpdateTripPage} from "../pages/create/UpdateTripPage.tsx";
import {DriverDetailsPage} from "../pages/trips/DriverDetailsPage.tsx";
import {PassengerDetailsPage} from "../pages/trips/PassengerDetailsPage.tsx";

// All routes are prefixed with /trips.
export default <Route key="/trips" path="/trips" element={<Outlet/>}>

    <Route key="" path="" element={<IndexTripsPage/>}/>,
    <Route key="create1" path="create1" element={<CreateTripPage1/>}/>,
    <Route key="create2" path="create2" element={<CreateTripPage2/>}/>,
    <Route key="create3" path="create3" element={<CreateTripPage3/>}/>,
    <Route key="create4" path="create4" element={<CreateTripPage4/>}/>,
    <Route key="update" path="update" element={<UpdateTripPage/>}/>,
    <Route key=":id" path=":id" element={<ShowTripPage/>}/>,
    <Route key="history/driver" path="history/driver" element={<DriverTripHistoryPage/>}/>,
    <Route key="history/passenger" path="history/passenger" element={<PassengerTripHistoryPage/>}/>,
    
    <Route key="details/driver" path="details/driver" element={<DriverDetailsPage/>}/>,
    <Route key="details/passenger" path="details/passenger" element={<PassengerDetailsPage/>}/>,
</Route>;