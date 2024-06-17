import { Route } from 'react-router-dom';
import { NotFoundPage } from "../pages/NotFoundPage.tsx";
import { CarlosPage } from "../pages/carlos/CarlosPage.tsx";

export default [
    <Route key="404" path="*" element={<NotFoundPage/>} />,
    <Route key="carlosRoute" path="carlos" element={<CarlosPage />} />
];