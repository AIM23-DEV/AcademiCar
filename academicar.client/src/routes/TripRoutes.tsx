import { Outlet, Route } from 'react-router-dom';
import { IndexTripsPage } from "../pages/trips/IndexTripsPage.tsx";
import { ShowTripPage } from "../pages/trips/ShowTripPage.tsx";
import { DriverTripHistoryPage } from "../pages/trips/DriverTripHistoryPage.tsx";
import { PassengerTripHistoryPage } from "../pages/trips/PassengerTripHistoryPage.tsx";
import { DriverDetailsPage } from "../pages/trips/DriverDetailsPage.tsx";
import { PassengerDetailsPage } from "../pages/trips/PassengerDetailsPage.tsx";

export default <Route key="tripsRoute" path="/trips" element={<Outlet/>}>

    <Route key="tripsMainRoute" path="" element={<IndexTripsPage/>} />,
    <Route key="tripsShowRoute" path=":id" element={<ShowTripPage/>} />,
    <Route key="tripsDriverHistoryRoute" path="history/driver" element={<DriverTripHistoryPage/>} />,
    <Route key="tripsPassengerHistoryRoute" path="history/passenger" element={<PassengerTripHistoryPage/>} />,
    <Route key="tripsDriverDetailRoute" path="details/driver" element={<DriverDetailsPage/>} />,
    <Route key="tripsPassengerDetailRoute" path="details/passenger" element={<PassengerDetailsPage/>} />,
    
</Route>;