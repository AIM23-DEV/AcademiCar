import {Outlet, Route} from 'react-router-dom';
import {IndexProfilePage} from "../pages/profile/IndexProfilePage.tsx";
import {ShowCarsPage} from "../pages/profile/ShowCarsPage.tsx";
import {CreateCarPage} from "../pages/profile/CreateCarPage.tsx";
import {UpdateCarPage} from "../pages/profile/UpdateCarPage.tsx"
import EditProfilePage from "../pages/profile/EditProfilePage.tsx";
import PersonalDataFaceSheet from "../pages/profile/PersonalDataFaceSheet.tsx";

// All routes are prefixed with /profile.
export default <Route key="/profile" path="/profile" element={<Outlet/>}>

    <Route key="" path="" element={<IndexProfilePage/>}/>,
    <Route key="cars/" path="cars/" element={<ShowCarsPage/>}/>,
    <Route key="cars/create" path="cars/create" element={<CreateCarPage/>}/>,
    <Route key="cars/update" path="cars/update" element={<UpdateCarPage/>}/>,
    <Route path="edit" element={<EditProfilePage/>} />
    <Route path="facesheet" element={<PersonalDataFaceSheet/>} />

</Route>;