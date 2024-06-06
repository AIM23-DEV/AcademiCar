//MOCKUP PAGE for Ratings.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const DriverList: React.FC = () => {
    const drivers = [
        { id: '1', name: 'Jon Doe' },
    ];

    return (
        <div>
            <h2>Driver List</h2>
            <ul>
                {drivers.map(driver => (
                    <li key={driver.id}>
                        <Link to={`/search/ratings/${driver.id}`}>{driver.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverList;
