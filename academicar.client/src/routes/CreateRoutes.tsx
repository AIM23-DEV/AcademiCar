import { Outlet, Route } from 'react-router-dom';
import { CreateTripPage } from "../pages/create/CreateTripPage.tsx";
import { UpdateTripPage } from "../pages/create/UpdateTripPage.tsx";

export default <Route key="createRoute" path="/create" element={<Outlet/>}>

    <Route key="createCreateRoute" path=":loggedInUserId" element={<CreateTripPage/>} />,
    <Route key="createUpdateRoute" path=":loggedInUserId/update/:tripId" element={<UpdateTripPage/>} />,
    
</Route>;