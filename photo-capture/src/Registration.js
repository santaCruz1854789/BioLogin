import React, { useRef, useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';

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
=======
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
>>>>>>> origin/main
    };

    return (
        <div className="container">
<<<<<<< HEAD
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                {errors.name && <p className="error">{errors.name}</p>}

                <label>
                    Surname:
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </label>
                {errors.surname && <p className="error">{errors.surname}</p>}

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
            <div style={{ marginTop: '20px' }}>
                <Link to="/login">Already have an account? Login</Link>
            </div>
=======
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
>>>>>>> origin/main
        </div>
    );
}

<<<<<<< HEAD
export default Register;
=======
export default Registration;
>>>>>>> origin/main
