import { Outlet, Route } from 'react-router-dom';
import { IndexChatsPage } from "../pages/chat/IndexChatsPage.tsx";
import { TripChatPage } from "../pages/chat/TripChatPage.tsx";
import { TripChatDetailPage } from "../pages/chat/TripChatDetailPage.tsx";
import { PersonalChatPage } from "../pages/chat/PersonalChatPage.tsx";
import { PersonalChatDetailPage } from "../pages/chat/PersonalChatDetailPage.tsx";

export default <Route key="chatRoute" path="/chat" element={<Outlet/>}>

    <Route key="chatMainRoute" path="" element={<IndexChatsPage/>} />,
    <Route key="chatTripRoute" path="trip/:id" element={<TripChatPage/>} />,
    <Route key="chatTripDetailRoute" path="trip/:id/detail" element={<TripChatDetailPage/>} />,
    <Route key="chatPersonalRoute" path="personal/:id" element={<PersonalChatPage/>} />,
    <Route key="chatPersonalDetailRoute" path="personal/:id/detail" element={<PersonalChatDetailPage/>} />,

</Route>;