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
export default <Route key="profileRoute" path="/profile" element={<Outlet/>}>
    <Route key="profileMainRoute" path="" element={<IndexProfilePage/>}/>,
    <Route key="profileCarRoute" path="cars/" element={<ShowCarsPage/>}/>,
    <Route key="profileCarCreateRoute" path="cars/create" element={<CreateCarPage/>}/>,
    <Route key="profileCarUpdateRoute" path="cars/update" element={<UpdateCarPage/>}/>,
    <Route key="profileEditRoute" path="edit" element={<EditProfilePage/>} />
    <Route key="profileFacesheetRoute" path="facesheet" element={<PersonalDataFaceSheet/>} />
    <Route key="profileSettingsRoute" path="settings" element={<SettingsPage/>} />
    <Route key="profileRewardsRoute" path="rewards" element={<RewardsPage/>} />
    <Route key="profileStatsRoute" path="stats" element={<StatsPage/>} />
    <Route key="profileBalanceRoute" path="balance" element={<BalancePage/>} />
    <Route key="profileBalanceHistoryRoute" path="balance/history" element={<BalanceHistoryPage/>} />
    <Route key="profileBalanceRechargeRoute" path="balance/recharge" element={<BalanceRechargePage/>} />
</Route>;