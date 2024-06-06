import {Outlet, Route} from 'react-router-dom';
import {IndexProfilePage} from "../pages/profile/IndexProfilePage.tsx";
import EditProfilePage from "../pages/profile/EditProfilePage.tsx";
import PersonalDataFaceSheet from "../pages/profile/PersonalDataFaceSheet.tsx";

// All routes are prefixed with /profile.
export default <Route key="/profile" path="/profile" element={<Outlet/>}>

    <Route key="" path="" element={<IndexProfilePage/>}/>
    <Route path="edit" element={<EditProfilePage/>} />
    <Route path="facesheet" element={<PersonalDataFaceSheet/>} />

</Route>;