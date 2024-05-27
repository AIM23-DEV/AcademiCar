import {useState} from "react";
import {Input} from "../../../components/FormFields.tsx";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
import {useTranslation} from "react-i18next";

export const SearchForm = () => {
    const [t] = useTranslation(['common', 'pages/search']);
    const [startPoint, setStartPoint] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSearch = () => {
        // TODO search logic
    };

    return (
        <Card label="Suche" className="mt-6">
            <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4">
                <Input
                    type="text"
                    fullWidth
                    placeholder="Startpunkt"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    className="col-span-full"
                />
                <Input
                    type="text"
                    fullWidth
                    placeholder="Ziel"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="col-span-full"
                />
                <Input
                    type="date"
                    fullWidth
                    placeholder="Datum"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="col-span-6"
                />
                <Input
                    type="time"
                    fullWidth
                    placeholder="Uhrzeit"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="col-span-6"
                />

                <Button
                    variant="primary"
                    fullWidth
                    text={t("common:actions.search")}
                    textAlign="center"
                    onClick={handleSearch}
                    className="col-span-full"
                />
            </form>
        </Card>
    );
};
