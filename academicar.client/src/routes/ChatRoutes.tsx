import { Outlet, Route } from 'react-router-dom';
import { IndexChatsPage } from "../pages/chat/IndexChatsPage.tsx";
import { TripChatPage } from "../pages/chat/TripChatPage.tsx";
import { TripChatDetailPage } from "../pages/chat/TripChatDetailPage.tsx";
import { PersonalChatPage } from "../pages/chat/PersonalChatPage.tsx";
import { PersonalChatDetailPage } from "../pages/chat/PersonalChatDetailPage.tsx";

export default <Route key="chatRoute" path="/chat" element={<Outlet/>}>

    <Route key="chatMainRoute" path=":loggedInUserId" element={<IndexChatsPage/>} />,
    <Route key="chatTripRoute" path="trip/:chatId" element={<TripChatPage/>} />,
    <Route key="chatTripDetailRoute" path="trip/:chatId/detail" element={<TripChatDetailPage/>} />,
    <Route key="chatPersonalRoute" path="personal/:chatId" element={<PersonalChatPage/>} />,
    <Route key="chatPersonalDetailRoute" path="personal/:chatId/detail" element={<PersonalChatDetailPage/>} />,

</Route>;