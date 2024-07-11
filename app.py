from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os
import face_recognition
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

threshold = 0.6

app.config['FEATURE_UPLOAD_FOLDER'] = 'features'  # Main folder for user registration images

if not os.path.exists(app.config['FEATURE_UPLOAD_FOLDER']):
    os.makedirs(app.config['FEATURE_UPLOAD_FOLDER'])


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    user_directory_name = f"{data['name']}_{data['surname']}".lower()

    feat_dir = os.path.join(app.config['FEATURE_UPLOAD_FOLDER'], user_directory_name)

    if not os.path.exists(feat_dir):
        os.makedirs(feat_dir)
    
    for i, photo_data in enumerate([data['photo1'], data['photo2'], data['photo3']], start=1):
        save_features(feat_dir, photo_data, f"feat{i}")
    
    return jsonify({'message': 'User registered successfully', 'user_directory': user_directory_name})

def save_features(user_dir, encoded_image, filename):
    try:
        # Decode the base64 image
        header, encoded = encoded_image.split(",", 1)
        image_data = base64.b64decode(encoded)
        
        # Convert the image data to a numpy array
        np_arr = np.frombuffer(image_data, np.uint8)
        
        # Decode the image from the numpy array using OpenCV
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise ValueError("Image data is not valid")
        
        # Convert the image from BGR (OpenCV format) to RGB (face_recognition format)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Extract face encodings
        encodings = face_recognition.face_encodings(image_rgb)
        if len(encodings) > 0:
            file_path = os.path.join(user_dir, f"{filename}.npy")
            np.save(file_path, encodings[0])  # Save the encoding as a .npy file
        else:
            raise ValueError("No face found in the image")
    except Exception as e:
        print("Exception occurred:", str(e))
        raise

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    image_data = data['image'].split(",")[1]
    
    # Decode the base64 image
    image_data = base64.b64decode(image_data)

    
    # Convert the image data to a numpy array
    np_arr = np.frombuffer(image_data, np.uint8)
    
    # Decode the image from the numpy array using OpenCV

    login_image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
                
    # Convert the image from BGR (OpenCV format) to RGB (face_recognition format)
    login_image_rgb = cv2.cvtColor(login_image, cv2.COLOR_BGR2RGB)
    
    # Extract face encodings
    login_encodings = face_recognition.face_encodings(login_image_rgb)

    if len(login_encodings) == 0:
        return jsonify({'message': 'No face found in the login image', 'status': 'error'})

    login_encoding = login_encodings[0]
    best_match = None
    lowest_distance = threshold

    for user_folder in os.listdir(app.config['FEATURE_UPLOAD_FOLDER']):
        user_dir = os.path.join(app.config['FEATURE_UPLOAD_FOLDER'], user_folder)
        if os.path.isdir(user_dir):
            user_encodings = []
            for feat_file in os.listdir(user_dir):
                if feat_file.endswith('.npy'):
                    stored_encoding = np.load(os.path.join(user_dir, feat_file))
                    user_encodings.append(stored_encoding)
            
            face_distances = face_recognition.face_distance(user_encodings, login_encoding)
            min_distance = np.min(face_distances)

            if min_distance < lowest_distance:
                lowest_distance = min_distance
                best_match = user_folder

    if best_match:
        name, surname = best_match.split('_')
        return jsonify({'status': 'success', 'name': name, 'surname': surname})
    else:
        return jsonify({'message': 'No matching face found', 'status': 'error'})


if __name__ == '__main__':
    app.run(debug=True)
