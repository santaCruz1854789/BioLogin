# BioLogin
A webapp that allows visitors to enroll with name, surname and photo, and subsequently log-in on the system through face identification alone.

The repository contains both the client-side written in React and server-side written in flask, which can be modified to accomodate the specific task.
The model for face recognition was taken from: https://face-recognition.readthedocs.io/en/latest/readme.html.

# Setup
Make sure to have downloaded python 3.11.9!

Create a virtual environment with the Python3.11.9 interpreter:

```bash
python3.11 -m venv verification_env
```

Activate it:
```bash
source verification_env/bin/activate
```

Install the dependencies from the requirements.txt file:
```bash
pip install -r requirements.txt
```

# Running the app
Once the setup is completed open two different terminals.

Run the back-end part by running:
```bash
python3 app.py
```

Run the front-end part by navigating in the "photo-capture" directory and running
```bash
npm start
```

### Conclusion
And now you too can test the magic of face recognition!
