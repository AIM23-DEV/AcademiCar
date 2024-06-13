import {Outlet, Route} from 'react-router-dom';
import {IndexProfilePage} from "../pages/profile/IndexProfilePage.tsx";
import {ShowCarsPage} from "../pages/profile/ShowCarsPage.tsx";
import {CreateCarPage} from "../pages/profile/CreateCarPage.tsx";
import {UpdateCarPage} from "../pages/profile/UpdateCarPage.tsx"
import EditProfilePage from "../pages/profile/EditProfilePage.tsx";
import PersonalDataFaceSheet from "../pages/profile/PersonalDataFaceSheet.tsx";
import {SettingsPage} from "../pages/profile/SettingsPage.tsx";
import {RewardsPage} from "../pages/profile/RewardsPage.tsx";
import {StatsPage} from "../pages/profile/StatsPage.tsx";
import {BalancePage} from "../pages/profile/BalancePage.tsx";
import {BalanceHistoryPage} from "../pages/profile/BalanceHistoryPage.tsx";
import {BalanceRechargePage} from "../pages/profile/BalanceRechargePage.tsx";

// All routes are prefixed with /profile.
export default <Route key="/profile" path="/profile" element={<Outlet/>}>

    <Route key="" path="" element={<IndexProfilePage/>}/>,
    <Route key="cars/" path="cars/" element={<ShowCarsPage/>}/>,
    <Route key="cars/create" path="cars/create" element={<CreateCarPage/>}/>,
    <Route key="cars/update" path="cars/update" element={<UpdateCarPage/>}/>,
    <Route path="edit" element={<EditProfilePage/>} />
    <Route path="facesheet" element={<PersonalDataFaceSheet/>} />
    <Route path="settings" element={<SettingsPage/>} />
    <Route path="rewards" element={<RewardsPage/>} />
    <Route path="stats" element={<StatsPage/>} />
    <Route path="balance" element={<BalancePage/>} />
    <Route path="balance/history" element={<BalanceHistoryPage/>} />
    <Route path="balance/recharge" element={<BalanceRechargePage/>} />
</Route>;