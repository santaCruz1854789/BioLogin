from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os
import face_recognition
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

app.config['RAW_UPLOAD_FOLDER'] = 'users'
app.config['FEATURE_UPLOAD_FOLDER'] = 'features'  # Main folder for user registration images
app.config['CACHE_FOLDER'] = 'cache'  # Folder for temporary storage during login

if not os.path.exists(app.config['RAW_UPLOAD_FOLDER']):
    os.makedirs(app.config['RAW_UPLOAD_FOLDER'])
if not os.path.exists(app.config['FEATURE_UPLOAD_FOLDER']):
    os.makedirs(app.config['FEATURE_UPLOAD_FOLDER'])
if not os.path.exists(app.config['CACHE_FOLDER']):
    os.makedirs(app.config['CACHE_FOLDER'])

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    user_directory_name = f"{data['name']}_{data['surname']}".lower()
    raw_dir = os.path.join(app.config['RAW_UPLOAD_FOLDER'], user_directory_name)
    feat_dir = os.path.join(app.config['FEATURE_UPLOAD_FOLDER'], user_directory_name)
    if not os.path.exists(raw_dir):
        os.makedirs(raw_dir)
    if not os.path.exists(feat_dir):
        os.makedirs(feat_dir)
    
    for i, photo_data in enumerate([data['photo1'], data['photo2'], data['photo3']], start=1):
        save_features(feat_dir, photo_data, f"feat{i}")
    
    return jsonify({'message': 'User registered successfully', 'user_directory': user_directory_name})

def save_features(user_dir, encoded_image, filename):
    # Decode the base64 image
    header, encoded = encoded_image.split(",", 1)
    image_data = base64.b64decode(encoded)
    
    # Convert the image data to a numpy array
    np_arr = np.frombuffer(image_data, np.uint8)
    
    # Decode the image from the numpy array using OpenCV
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    # Extract face encodings
    encodings = face_recognition.face_encodings(image)
    if encodings:
        file_path = os.path.join(user_dir, f"{filename}.npy")
        np.save(file_path, encodings[0])  # Save the encoding as a .npy file
    else:
        raise ValueError("No face found in the image")

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    name = data['name']
    surname = data['surname']
    image_data = data['image'].split(",")[1]
    
    user_folder = os.path.join(app.config['FEATURE_UPLOAD_FOLDER'], f"{name}_{surname}".lower())

    if os.path.exists(user_folder):
        # Decode the base64 image
        image_data = base64.b64decode(image_data)
        
        # Convert the image data to a numpy array
        np_arr = np.frombuffer(image_data, np.uint8)
        
        # Decode the image from the numpy array using OpenCV
        login_image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        # Extract face encodings
        login_encodings = face_recognition.face_encodings(login_image)
        
        if login_encodings:
            login_encoding = login_encodings[0]
            user_encodings = []

            # Load all stored encodings for the user
            for feat_file in os.listdir(user_folder):
                if feat_file.endswith('.npy'):
                    stored_encoding = np.load(os.path.join(user_folder, feat_file))
                    user_encodings.append(stored_encoding)

            # Compare the login encoding with stored encodings
            face_distances = face_recognition.face_distance(user_encodings, login_encoding)

            for i, face_distance in enumerate(face_distances):
                print("The test image has a distance of {:.2} from known image #{}".format(face_distance, i))
                print("- With a normal cutoff of 0.6, would the test image match the known image? {}".format(face_distance < 0.6))
                print("- With a very strict cutoff of 0.5, would the test image match the known image? {}".format(face_distance < 0.5))
                print()

            # Check if any distances are below the threshold (0.6)
            if any(face_distance < 0.6 for face_distance in face_distances):
                return jsonify({'message': 'User recognized', 'status': 'success'})
            else:
                return jsonify({'message': 'User not recognized', 'status': 'error'})
        else:
            return jsonify({'message': 'No face found in the login image', 'status': 'error'})
    else:
        return jsonify({'message': 'User not found', 'status': 'error'})

if __name__ == '__main__':
    app.run(debug=True)
