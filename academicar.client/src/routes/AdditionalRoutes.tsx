import {Route} from 'react-router-dom';
import {NotFoundPage} from "../pages/NotFoundPage.tsx";
import {CarlosPage} from "../pages/carlos/CarlosPage.tsx";

// These routes do not use a prefix.
export default [
    <Route key="404" path="*" element={<NotFoundPage/>} />,
    <Route key="carlosRoute" path="carlos" element={<CarlosPage />} />
];