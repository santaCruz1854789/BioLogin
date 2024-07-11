import cv2
import face_recognition
import os

identity1 = 1
identity2 = 1
enrolled_photo = 1

path_photo = "../Evaluation/CASIA_WebFace_dataset/identity_"+str(identity1)+"/image_"+str(enrolled_photo)+".png"

src_gender_model_path = "./models/dnn_gender_classifier_v1.dat.bz2"
dst_gender_model_path = "./models/dnn_gender_classifier_v1.dat"

def compare_faces(enrolled_photo, identity1, identity2 = 0):
    for prob_photo in range(0, 6):
        if prob_photo != enrolled_photo:
            path_photo1 = "../Evaluation/CASIA_WebFace_dataset/identity_"+str(identity1)+"/image_"+str(enrolled_photo)+".png"
            path_photo2 = "../Evaluation/CASIA_WebFace_dataset/identity_"+str(identity2)+"/image_"+str(prob_photo)+".png"
            
            image1 = face_recognition.face_encodings(face_recognition.load_image_file(path_photo1))
            image2_encodings = face_recognition.load_image_file(path_photo2)
            image2 = face_recognition.face_encodings(image2_encodings)[0]

            print(face_recognition.compare_faces(image1, image2))
    
#def classify_gender(image_path):
#    img_name = f"identity{identity}"
    #try:
        #img_arr = cv2.imread(image_path)
        #response = DeepFace.analyze(img_arr, actions=["gender"], enforce_detection=False, silent=True)
        #return response[0]['dominant_gender']
#    
    #except Exception as e:
        #print(f"An error occurred: {e}")

    #return img_name



