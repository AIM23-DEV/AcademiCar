﻿import React, { useEffect, useState } from 'react';
import { BottomNavigationBar } from "./components/BottomNavigationBar";
import { Button } from "./components/Buttons";
import { TitleBar } from "./components/TitleBar";
import { ConfirmationModal } from "./components/Modal";
import { useAuth } from './AuthContext';

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

const HomePage: React.FC = () => {
    const { selectIdP } = useAuth();
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

    return (
        <div
            className="relative min-h-screen flex flex-col items-center mx-auto bg-gray-100 max-w-5xl selection:bg-primary-600 selection:text-white">
            <TitleBar text="AcademiCar" hasBackAction />

            <div className="w-full flex flex-col items-center p-6 space-y-8">
                <Button text="Select Identity Provider" className="" onClick={selectIdP} />
                <Button text="Admin Login" className="" onClick={() => window.location.href = "/admin-login"} />
                <Button text="Das ist ein Primary Button" className="" onClick={() => setShowModal(true)} />
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                {testTableEntry !== null && (
                    <div>
                        <h2>TestTable Entry Details</h2>
                        <p>Name: {testTableEntry.name}</p>
                    </div>
                )}
            </div>

            <BottomNavigationBar selected="search" />

            <ConfirmationModal open={showModal} setOpen={setShowModal}
                               onConfirm={() => alert("Confirmed")}
                               subtitle="Das ist ein Bestätigungs-Modal. Hier kann man einige Einstellungen mitgeben!" />
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

export default HomePage;
