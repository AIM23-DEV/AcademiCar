import { Outlet, Route } from 'react-router-dom';
import { CreateTripPage1 } from "../pages/create/CreateTripPage1.tsx";
import { CreateTripPage2 } from "../pages/create/CreateTripPage2.tsx";
import { CreateTripPage3 } from "../pages/create/CreateTripPage3.tsx";
import { CreateTripPage4 } from "../pages/create/CreateTripPage4.tsx";
import { UpdateTripPage } from "../pages/create/UpdateTripPage.tsx";

export default <Route key="createRoute" path="/create" element={<Outlet/>}>

    <Route key="create1Route" path="1" element={<CreateTripPage1/>} />,
    <Route key="create2Route" path="2" element={<CreateTripPage2/>} />,
    <Route key="create3Route" path="3" element={<CreateTripPage3/>} />,
    <Route key="create4Route" path="4" element={<CreateTripPage4/>} />,
    <Route key="createUpdateRoute" path=":id" element={<UpdateTripPage/>} />,
    
</Route>;