import { Link } from 'react-router-dom';

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
        <div>
            <h1>Letzte Suchanfragen</h1>
            <ul>
                {pastTrips.map((trip, index) => (
                    <li key={index}>
                        <Link to={`/detail/trip/${index}`}>{trip}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
