import React from 'react';
import { useLocation } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const { user } = location.state || { user: { name: 'Unknown', surname: 'User' } };

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
        </div>
    );
}

export default Profile;
