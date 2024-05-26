import { Link } from 'react-router-dom';
import {Card} from "../../../components/Cards.tsx";

interface Trip {
    // TODO implement Trip type globally...
}

function GetTripHistory(): Trip[] {
    // TODO implement history loading...

    return [];
}

// TODO re-layout
export const SearchHistory = () => {
    const pastTrips: Trip[] = GetTripHistory();

    return (
        <Card label="Letzte Suchanfragen" className="mt-8">
            <h1>Todo</h1>
            <ul>
                {pastTrips.map((trip, index) => (
                    <li key={index}>
                        <Link to={`/detail/trip/${index}`}>{trip.toString()}</Link> //.toString added only for now
                    </li>
                ))}
            </ul>
        </Card>
    );
};
