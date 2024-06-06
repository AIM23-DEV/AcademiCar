import {Outlet, Route} from 'react-router-dom';
import {IndexChatsPage} from "../pages/chat/IndexChatsPage.tsx";
import {TripChatPage} from "../pages/chat/TripChatPage.tsx";
import {TripChatDetailPage} from "../pages/chat/TripChatDetailPage.tsx";
import {PersonalChatPage} from "../pages/chat/PersonalChatPage.tsx";
import {PersonalChatDetailPage} from "../pages/chat/PersonalChatDetailPage.tsx";

export default <Route key="/chat" path="/chat" element={<Outlet/>}>

    <Route key="" path="" element={<IndexChatsPage/>}/>,
    <Route key="trip/:id" path="trip/:id" element={<TripChatPage/>}/>,
    <Route key="trip/:id/detail" path="trip/:id/detail" element={<TripChatDetailPage/>}/>,
    <Route key="personal/:id" path="personal/:id" element={<PersonalChatPage/>}/>,
    <Route key="personal/:id/detail" path="personal/:id/detail" element={<PersonalChatDetailPage/>}/>,

</Route>;