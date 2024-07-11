import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';  // Assuming your CSS file is named App.css

function MainPage() {
    return (
        <div className="container">
            <h1>Welcome to BioLogin</h1>
            <div className="button-container">
                <Link to="/login" className="btn nav-link">Login</Link>
            </div>
            <div className="button-container">
                <Link to="/register" className="btn nav-link">Register</Link>
            </div>
        </div>
    );
}

export default MainPage;
