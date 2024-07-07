import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div className="container">
<<<<<<< HEAD
            <h1>Welcome to the Biometric System</h1>
            <div style={{ marginTop: '20px' }}>
                <Link to="/login" className="nav-link">Login</Link>
            </div>
            <div style={{ marginTop: '10px' }}>
                <Link to="/register" className="nav-link">Register</Link>
            </div>
=======
            <h1>Welcome to Our Biometric System</h1>
            <p>Select an option:</p>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
>>>>>>> origin/main
        </div>
    );
}

export default MainPage;
