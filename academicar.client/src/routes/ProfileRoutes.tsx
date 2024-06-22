import {Outlet, Route} from 'react-router-dom';
import {IndexProfilePage} from "../pages/profile/IndexProfilePage.tsx";
import {EditProfilePage} from "../pages/profile/EditProfilePage.tsx";
import {FaceSheetPage} from "../pages/profile/FaceSheetPage.tsx";
import {ShowCarsPage} from "../pages/profile/ShowCarsPage.tsx";
import {UpdateCarPage} from "../pages/profile/UpdateCarPage.tsx"
import {SettingsPage} from "../pages/profile/SettingsPage.tsx";
import {RewardsPage} from "../pages/profile/RewardsPage.tsx";
import {StatsPage} from "../pages/profile/StatsPage.tsx";
import {BalancePage} from "../pages/profile/BalancePage.tsx";
import {BalanceHistoryPage} from "../pages/profile/BalanceHistoryPage.tsx";
import {BalanceRechargePage} from "../pages/profile/BalanceRechargePage.tsx";
import {ImageUploadPage} from "../pages/profile/ImageUploadPage.tsx";

export default <Route key="profileRoute" path="/profile/" element={<Outlet/>}>
    <Route key="profileMainRoute" path=":loggedInUserId" element={<IndexProfilePage/>} />
    <Route key="profileEditRoute" path=":loggedInUserId/edit" element={<EditProfilePage/>} />
    <Route key="profileFacesheetRoute" path=":loggedInUserId/facesheet" element={<FaceSheetPage/>} />
    <Route key="profileCarRoute" path=":loggedInUserId/cars" element={<ShowCarsPage/>} />
    <Route key="profileCarUpdateRoute" path=":loggedInUserId/cars/:vehicleId" element={<UpdateCarPage/>} />
    <Route key="profileSettingsRoute" path=":loggedInUserId/settings" element={<SettingsPage/>} />
    <Route key="profileRewardsRoute" path=":loggedInUserId/rewards" element={<RewardsPage/>} />
    <Route key="profileStatsRoute" path=":loggedInUserId/stats/" element={<StatsPage/>} />
    <Route key="profileBalanceRoute" path=":loggedInUserId/balance" element={<BalancePage/>} />
    <Route key="profileBalanceHistoryRoute" path=":loggedInUserId/balance/history" element={<BalanceHistoryPage/>} />
    <Route key="profileBalanceRechargeRoute" path=":loggedInUserId/balance/recharge" element={<BalanceRechargePage/>} />

    <Route key="profileImageUploadRoute" path="upload" element={<ImageUploadPage/>} />
</Route>;