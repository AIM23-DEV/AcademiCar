import {Outlet, Route} from 'react-router-dom';
import {IndexChatsPage} from "../pages/chat/IndexChatsPage.tsx";

// All routes are prefixed with /chat.
export default <Route key="/chat" path="/chat" element={<Outlet/>}>

    <Route key="" path="" element={<IndexChatsPage/>}/>,

</Route>;