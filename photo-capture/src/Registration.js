import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [name, setName] = useState(''); 
    const [surname, setSurname] = useState('');
    const [photos, setPhotos] = useState([]);
    const [cameraActive, setCameraActive] = useState(false);
    const navigate = useNavigate();

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then(stream => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setStream(stream);
            setCameraActive(true);
        })
        .catch(err => {
            console.error("Error accessing the camera: ", err);
        });
    };

    const takePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        
        setPhotos(oldPhotos => {
            const newPhotos = [...oldPhotos, imageData];
            if (newPhotos.length > 3) {
                newPhotos.shift();
            }
            return newPhotos;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (photos.length < 3) {
            alert('Please capture at least three photos.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/register', {
                name,
                surname,
                photo1: photos[0],
                photo2: photos[1],
                photo3: photos[2]
            });
            alert('User registered successfully: ' + response.data.message);
            navigate('/profile', { state: { user: { name, surname } } });
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed');
        }
    };

    const handleReturn = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                <input type="text" value={surname} onChange={e => setSurname(e.target.value)} placeholder="Surname" required />
                <video ref={videoRef} style={{ width: '100%' }}></video>
                <div>
                    <button type="button" onClick={cameraActive ? takePhoto : getVideo}>
                        {cameraActive ? 'Take Photo' : 'Activate Camera'}
                    </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    {photos.map((photo, index) => (
                        <img key={index} src={photo} alt={`Captured ${index}`} style={{ width: '100px', height: '100px' }} />
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <button type="submit" disabled={photos.length < 3}>Register</button>
                    <button type="button" onClick={handleReturn}>
                        Return to Main Page
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Registration;
