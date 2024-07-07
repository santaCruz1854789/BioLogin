import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
=======
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';  // Import the context you have created
>>>>>>> origin/main

function Login() {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [imageData, setImageData] = useState('');
    const [cameraActive, setCameraActive] = useState(false);
<<<<<<< HEAD
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
=======
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const navigate = useNavigate();

    // Use context for user authentication status
    const { user, login, logout } = useContext(UserContext);
>>>>>>> origin/main

    const getVideo = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setStream(stream);
                setCameraActive(true);
            })
            .catch(err => {
                console.error("Error accessing the camera: ", err);
            });
        }
    };

    const takePhoto = () => {
        if (imageData) {
            if (window.confirm("Are you sure you want to take another photo? This will discard the current one.")) {
                capturePhoto();
            }
        } else {
            capturePhoto();
        }
    };

    const capturePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const newImageData = canvas.toDataURL('image/png');
        setImageData(newImageData);
    };

    const stopVideoStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraActive(false);
        }
    };

    const handleLogin = () => {
<<<<<<< HEAD
        axios.post('http://localhost:5000/login', { image: imageData })
            .then(response => {
                if (response.data.status === 'success') {
                    stopVideoStream();
                    login({ name: response.data.name, surname: response.data.surname });
                    navigate('/profile', { state: { user: { name: response.data.name, surname: response.data.surname } } });
                } else {
                    alert(response.data.message);
=======
        axios.post('http://localhost:5000/login', { name, surname, image: imageData })
            .then(response => {
                if (response.data.status === 'success') {
                    stopVideoStream();
                    login({ name: name, surname: surname }); // Log in the user with context
                    navigate('/profile', { state: { user: { name, surname } } });
                } else {
                    alert(response.data.message);
                    // Do not navigate to main page
>>>>>>> origin/main
                }
            })
            .catch(error => {
                console.error('Login failed:', error);
                alert('Login failed');
<<<<<<< HEAD
=======
                // Do not navigate to main page
>>>>>>> origin/main
            });
    };

    const handleReturn = () => {
        stopVideoStream();
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Login</h1>
<<<<<<< HEAD
            <video ref={videoRef}></video>
            <div>
                <button type="button" onClick={cameraActive ? takePhoto : getVideo}>
                    {cameraActive ? 'Take Photo' : 'Activate Camera'}
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {imageData && <img src={imageData} alt="Captured" style={{ width: '100px', height: '100px' }} />}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button onClick={handleLogin} disabled={!imageData}>Login</button>
                <button type="button" onClick={handleReturn}>Return to Main Page</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/register">Don't have an account? Register</Link>
            </div>
=======
            {user ? (
                <div>
                    <p>Hi {user.name} {user.surname}</p>
                    <button onClick={() => { 
                        stopVideoStream(); 
                        logout();  // Log out user and clear session
                        navigate('/');
                    }}>Logout</button>
                </div>
            ) : (
                <div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" />
                    <video ref={videoRef}></video>
                    <div>
                        <button type="button" onClick={cameraActive ? takePhoto : getVideo}>
                            {cameraActive ? 'Take Photo' : 'Activate Camera'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        {imageData && <img src={imageData} alt="Captured" style={{ width: '100px', height: '100px' }} />}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <button onClick={handleLogin} disabled={!imageData || !name || !surname}>Login</button>
                        <button type="button" onClick={handleReturn}>
                            Return to Main Page
                        </button>
                    </div>
                </div>
            )}
>>>>>>> origin/main
        </div>
    );
}

export default Login;
