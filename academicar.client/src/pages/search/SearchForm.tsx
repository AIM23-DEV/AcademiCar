import { useState } from "react";
import { Input } from "../../components/FormFields";
import { Button } from "../../components/Buttons";

export const SearchForm = () => {
    const [startPoint, setStartPoint] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSearch = () => {
        // TODO search logic
    };

    return (
        <form aria-label="Suche">
            <Input
                type="text"
                fullWidth={true}
                placeholder="Startpunkt"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
            />
            <Input
                type="text"
                fullWidth={true}
                placeholder="Ziel"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <Input
                type="date"
                fullWidth={false}
                placeholder="Datum"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <Input
                type="time"
                fullWidth={false}
                placeholder="Uhrzeit"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <Button
                variant="primary"
                text="Suchen"
                textAlign="center"
                onClick={handleSearch}
            />
        </form>
    );
};
