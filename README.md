# BioLogin
A webapp that allows visitors to enroll and subsequently log-in on the system through name, surname and face identification.

The repository contains both the client-side written in React and server-side written in flask, which can be modified to accomodate the specific task.
The model for face recognition was taken from: https://face-recognition.readthedocs.io/en/latest/readme.html.

It works on Linux.

## To run the App
You need to use VSC and open two terminals to start the client and server side respectively.

### Starting the Client-Side
In the first terminal, navigate to the "capture-photo" folder that is found in the root of the project and type
```bash
npm start
```

Run the command and let it execute.
This will run the React App which will open up in your browser.

### Starting the Server-Side
On the second terminal, navigate to the root of the project and type:
```bash
python3 app.py
```

and run the command.

### Conclusion
These two commands should allow you to interact with the webpage, enroll and log-in through the use of face identification.
