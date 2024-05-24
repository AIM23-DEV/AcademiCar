import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {BottomNavigationBar} from "./components/BottomNavigationBar.tsx";
import {Button} from "./components/Buttons.tsx";
import {ConfirmationModal} from "./components/Modal.tsx";
import {TitleBar} from "./components/TitleBar.tsx";
import {TripDetailPage} from './pages/search/TripDetailPage.tsx';
import {HomePage} from './pages/HomePage.tsx';
import {Layout} from './pages/Layout.tsx';
import {AuthenticationPage} from './pages/auth/AuthenticationPage.tsx';
import {NoPage} from './pages/NoPage.tsx';
import {TripSearchPage} from './pages/search/TripSearchPage.tsx';
import {TripsPage} from './pages/trips/TripsPage.tsx';
import {TripCreatePage} from './pages/create/TripCreatePage.tsx';
import {ChatPage} from './pages/chat/ChatPage.tsx';
import {ProfilePage} from './pages/profile/ProfilePage.tsx';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

interface TestTableEntry {
    Id: number;
    name: string;
}

// TODO remove forecast and test stuff...
function App() {
    const [title, setTitle] = useState("AcademiCar");
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [testTableEntry, setTestTableEntry] = useState<TestTableEntry | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        populateWeatherData();
        fetchTestTableEntryById(1);
    }, []);

    useEffect(() => {
        setTitle(title);
    }, [title]);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a
            href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em>
        </p>
        : <table className="mt-8" aria-labelledby="tabelLabel">
            <thead>
            <tr className="text-secondary-600">
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
            </tr>
            </thead>
            <tbody>
            {forecasts.map(forecast =>
                <tr key={forecast.date}>
                    <td>{forecast.date}</td>
                    <td>{forecast.temperatureC}</td>
                    <td>{forecast.temperatureF}</td>
                    <td>{forecast.summary}</td>
                </tr>
            )}
            </tbody>
        </table>;
    console.log("hehe:", testTableEntry?.name);
    return (
        <div>
            <Routes>
                <Route path="/login" element={<AuthenticationPage/>}/>

                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="search" element={<TripSearchPage/>}/>
                    <Route path="trips" element={<TripsPage/>}/>
                    <Route path="create" element={<TripCreatePage/>}/>
                    <Route path="chat" element={<ChatPage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="detail/trip/:id" element={<TripDetailPage/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>

            # TODO Testing stuff, remove later
            <div
                className="relative min-h-screen flex flex-col items-center mx-auto bg-gray-100 max-w-5xl selection:bg-primary-600 selection:text-white">
                <TitleBar text="AcademiCar" hasBackAction/>

                <div className="w-full flex flex-col items-center p-6 space-y-8">
                    <Button text="Das ist ein Primary Button" className="" onClick={() => setShowModal(true)}/>
                    <p>This component demonstrates fetching data from the server.</p>
                    {contents}
                    {testTableEntry !== null && (
                        <div>
                            <h2>TestTable Entry Details</h2>
                            <p>Name: {testTableEntry.name}</p>
                        </div>
                    )}
                </div>

                <BottomNavigationBar selected="search"/>

                <ConfirmationModal open={showModal} setOpen={setShowModal}
                                   onConfirm={() => alert("Confirmed")}
                                   subtitle="Das ist ein Bestätigungs-Modal. Hier kann man einige Einstellungen mitgeben!"/>
            </div>
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }

    async function fetchTestTableEntryById(id: number) {
        try {
            const response = await fetch(`weatherforecast/TestTableEntries/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setTestTableEntry(data);
        } catch (error) {
            console.error(error);
            setTestTableEntry(null);
        }
    }
}

export default App;