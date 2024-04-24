import {useEffect, useState} from 'react';
import './App.css';

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
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [testTableEntry, setTestTableEntry] = useState<TestTableEntry | null>(null);

    useEffect(() => {
        populateWeatherData();
        fetchTestTableEntryById(1);
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a
            href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em>
        </p>
        : <table className="mt-8" aria-labelledby="tabelLabel">
            <thead>
            <tr>
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
        
        <div className="flex flex-col items-center justify-center">
            <h1 id="tabelLabel" className="text-2xl font-bold">Wieser und Hubert unterwegs</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {testTableEntry !== null && (
                <div>
                    <h2>TestTable Entry Details</h2>
                    <p>Name: {testTableEntry.name}</p>
                </div>
            )}
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