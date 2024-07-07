import React from 'react';
<<<<<<< HEAD
import { useLocation, useNavigate } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || { user: { name: 'Unknown', surname: 'User' } };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Welcome, {user.name} {user.surname}</h1>
            <button onClick={handleLogout} style={{ padding: '8px 16px', fontSize: '14px', marginTop: '20px' }}>
                Log Out
            </button>
=======
import { useLocation } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const { user } = location.state || { user: { name: 'Unknown', surname: 'User' } };

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
>>>>>>> origin/main
        </div>
    );
}

export default Profile;
