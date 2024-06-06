import {Route} from 'react-router-dom';
import {NotFoundPage} from "../pages/NotFoundPage.tsx";

// These routes do not use a prefix.
export default [
    <Route key="404" path="*" element={<NotFoundPage/>}/>,
];