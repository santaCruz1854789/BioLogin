import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div className="container">
            <h1>Welcome to Our Biometric System</h1>
            <p>Select an option:</p>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
        </div>
    );
}

export default MainPage;
