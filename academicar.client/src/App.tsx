import {Route, Routes} from 'react-router-dom';
import {HomePage} from './pages/HomePage.tsx';
import AuthenticationRoutes from "./routes/AuthenticationRoutes.tsx";
import SearchRoutes from "./routes/SearchRoutes.tsx";
import TripRoutes from "./routes/TripRoutes.tsx";
import ChatRoutes from "./routes/ChatRoutes.tsx";
import ProfileRoutes from "./routes/ProfileRoutes.tsx";
import AdditionalRoutes from "./routes/AdditionalRoutes.tsx";
import AdminRoutes from "./routes/AdminRoutes.tsx";

function App() {
    return (
        <Routes>
            {/* Todo remove when obsolete */}
            <Route index element={<HomePage/>}/>

            {/* Routes are saved in separate files. */}
            {AuthenticationRoutes}
            {SearchRoutes}
            {TripRoutes}
            {ChatRoutes}
            {ProfileRoutes}
            {AdminRoutes}
            {AdditionalRoutes}
        </Routes>
    );
}

export default App;