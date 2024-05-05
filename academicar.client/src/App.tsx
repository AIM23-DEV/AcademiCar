import {useEffect, useState} from 'react';
import {BottomNavigationBar} from "./components/BottomNavigationBar.tsx";
import {Button} from "./components/Buttons.tsx";
import {TitleBar} from "./components/TitleBar.tsx";

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

function App() {
    const [title, setTitle] = useState("AcademiCar");
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [testTableEntry, setTestTableEntry] = useState<TestTableEntry | null>(null);

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
        <div className="relative min-h-screen flex flex-col items-center mx-auto bg-gray-100 max-w-5xl">
            <TitleBar text="AcademiCar" hasBackAction/>
            <h1 id="tabelLabel" className="headline-2 text-primary-600 mt-6">Wieser und Hubert unterwegs</h1>
            <Button text="Das ist ein Primary Button" className="my-8" onClick={() => alert("Test")}/>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {testTableEntry !== null && (
                <div>
                    <h2>TestTable Entry Details</h2>
                    <p>Name: {testTableEntry.name}</p>
                </div>
            )}

            <BottomNavigationBar selected="search"/>
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