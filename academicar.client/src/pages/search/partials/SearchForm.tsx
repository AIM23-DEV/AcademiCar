import {useState} from "react";
import {Input} from "../../../components/FormFields.tsx";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
import {useTranslation} from "react-i18next";
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
    const [t] = useTranslation(['common', 'pages/search']);
    const startPointPlaceholderText = t("common:trip.start");
    const destinationPlaceholderText = t("common:trip.destination");
    const datePlaceholderText = t("common:trip.date");
    const timePlaceholderText = t("common:trip.time");
    const searchButtonText = t("common:actions.search")
    
    const [startPoint, setStartPoint] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const navigate = useNavigate();

    const handleSearch = () => {
        // build searchquery
        let searchString = "/search/result?";
        if (startPoint.trim()) {
            searchString += `start=${encodeURIComponent(startPoint)}&`
        }
        if (destination.trim()) {
            searchString += `end=${encodeURIComponent(destination)}&`
        }
        if (date.trim()) {
            searchString += `date=${encodeURIComponent(date)}&`
        }
        if (time.trim()) {
            searchString += `time=${encodeURIComponent(time)}`
        }
        
        if (searchString.trim()) {
            navigate(searchString)
        }
    };

    return (
        <Card label="Suche" className="mt-6">
            <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4">
                <Input
                    type="text"
                    fullWidth
                    placeholder={startPointPlaceholderText}
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    className="col-span-full"
                />
                <Input
                    type="text"
                    fullWidth
                    placeholder={destinationPlaceholderText}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="col-span-full"
                />
                <Input
                    type="date"
                    fullWidth
                    placeholder={datePlaceholderText}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="col-span-6"
                />
                <Input
                    type="time"
                    fullWidth
                    placeholder={timePlaceholderText}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="col-span-6"
                />

                <Button
                    variant="primary"
                    fullWidth
                    text={searchButtonText}
                    textAlign="center"
                    onClick={handleSearch}
                    className="col-span-full"
                />
            </form>
        </Card>
    );
};
