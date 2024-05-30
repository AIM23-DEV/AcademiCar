import React from 'react';
import { useAuth } from './AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    console.log("Logged-in user:", user); // Add this line for debugging

    if (!user) {
        return <p>Loading...</p>; // or redirect to login if not authenticated
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
