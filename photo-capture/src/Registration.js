import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';  // Assuming your CSS file is named App.css

function Register() {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [cameraActive, setCameraActive] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
        if (photos.length >= 3) {
            alert("You have already taken 3 photos.");
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const newImageData = canvas.toDataURL('image/png');
        setPhotos([...photos, newImageData]);
    };

    const stopVideoStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraActive(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        let validationErrors = {};
        if (!name) validationErrors.name = "Name is required";
        if (!surname) validationErrors.surname = "Surname is required";
        if (photos.length !== 3) validationErrors.photos = "You must take exactly 3 photos";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const data = {
            name: name,
            surname: surname,
            photo1: photos[0],
            photo2: photos[1],
            photo3: photos[2]
        };

        axios.post('http://localhost:5000/register', data)
            .then(response => {
                alert(response.data.message);
                stopVideoStream();
                navigate('/login');
            })
            .catch(error => {
                console.error('Registration failed:', error);
                alert('Registration failed');
            });
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="input-group">
                    <label>
                        Surname:
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </label>
                    {errors.surname && <p className="error">{errors.surname}</p>}
                </div>

                <div>
                    <video ref={videoRef}></video>
                    <div>
                        <button type="button" onClick={cameraActive ? takePhoto : getVideo}>
                            {cameraActive ? 'Take Photo' : 'Activate Camera'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        {photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Captured ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                        ))}
                    </div>
                </div>
                {errors.photos && <p className="error">{errors.photos}</p>}

                <button type="submit">Register</button>
            </form>
            <div className="link-container">
                <Link to="/login">Already have an account? Login</Link>
            </div>
            <div className="link-container">
                <Link to="/">Go back to main page</Link>
            </div>
        </div>
    );
}

export default Register;
