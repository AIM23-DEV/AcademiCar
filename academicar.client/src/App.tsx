import {Route, Routes} from 'react-router-dom';
import {HomePage} from './pages/HomePage.tsx';
import AuthenticationRoutes from "./routes/AuthenticationRoutes.tsx";
import SearchRoutes from "./routes/SearchRoutes.tsx";
import TripRoutes from "./routes/TripRoutes.tsx";
import ChatRoutes from "./routes/ChatRoutes.tsx";
import ProfileRoutes from "./routes/ProfileRoutes.tsx";
import AdditionalRoutes from "./routes/AdditionalRoutes.tsx";
import AdminRoutes from "./routes/AdminRoutes.tsx";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import SetPageLocale from "./hooks/set_page_locale.tsx";

function App() {
    SetPageLocale();
    
    return (
        <I18nextProvider i18n={i18next}>
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
        </I18nextProvider>
    );
}

export default App;