import React from 'react';
import {useAuth} from '../../AuthContext';

const Dashboard: React.FC = () => {
    const {user} = useAuth();

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Username: {user.userName}</p>
            <p>First Name: {user.firstName}</p>
        </div>
    );
};

export default Dashboard;
