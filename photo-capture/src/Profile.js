import React from 'react';
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
        </div>
    );
}

export default Profile;
