import { Outlet, Route } from 'react-router-dom';
import { CreateTripPage1 } from "../pages/create/CreateTripPage1.tsx";
import { CreateTripPage2 } from "../pages/create/CreateTripPage2.tsx";
import { CreateTripPage3 } from "../pages/create/CreateTripPage3.tsx";
import { CreateTripPage4 } from "../pages/create/CreateTripPage4.tsx";
import { UpdateTripPage } from "../pages/create/UpdateTripPage.tsx";

export default <Route key="createRoute" path="/create" element={<Outlet/>}>

    <Route key="create1Route" path="route" element={<CreateTripPage1/>} />,
    <Route key="create2Route" path="time" element={<CreateTripPage2/>} />,
    <Route key="create3Route" path="vehicle" element={<CreateTripPage3/>} />,
    <Route key="create4Route" path="pricing" element={<CreateTripPage4/>} />,
    <Route key="createUpdateRoute" path=":id" element={<UpdateTripPage/>} />,
    
</Route>;