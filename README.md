## Shopify Summer Internship Backend Challenge 2021

[Challenge Details](https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit)

## Technologies 
- NodeJS
- MongoDB
- React

## Libraries
- Express
- Passport
- JWT
- bCrypt
- Multer
- Mongoose
- Bootstrap

## File Structure
```
.
├── backend/ - Backend App
| ├── config/ - Passport.js configuration and constants for the endpoints and port 
| ├── models/ - Model schemas for MongoDB
│ ├── routes/ - Handles API calls for routes
│ ├── scripts/ - scripts to publish
│ ├── app.js - Adds middleware to the express server
│ └── server.js - Configures Port and HTTP Server
├── frontend/ - Frontend App
│ ├── public/ - public static files
│ ├── scripts/ - scripts to publish
│ ├── src/ - react app folder
│ │ ├── components - React components for each page
│ │ ├── App.js - React routing
│ └─└── index.js - React root component
└── README.md
```

## Deployment

#### Frontend

The frontend is based on [create-react-app](https://github.com/facebook/create-react-app).

The most important scripts in the `package.json` are:
  - start: serves the frontend in development on http://localhost:3000/.
  - build: Builds the app for production to the `build` folder.
  - publish: Builds the app for production and moves the output to the `publish` folder.
  - test: Launches the test runner in the interactive watch mode.

To start the frontend application manually:
  1. Open a terminal and navigate to the `frontend` folder path.
  2. Use `yarn install` or `npm install` to install frontend dependencies.
  3. Use `yarn start` or `npm start` to start frontend app in development.

#### Backend

The backend is based on [Express Generator](https://expressjs.com/en/starter/generator.html).

The most important scripts in the `package.json` are:
  - start: serves the backend in development on http://localhost:5000/.
  - publish: copies the backend files to the `publish` folder.

To start the backend application manually:
  1. Open a terminal and navigate to the `backend` folder path.
  2. Use `yarn install` or `npm install` to install backend dependencies.
  3. Use `yarn start` or `npm start` to start backend app in development.


## Features
- Validation on all API routes using Passport and JWT
- Secure registration and login/logout with password hashing
- Upload multiple files (max 10) at one time with private or public visibility
- Validation of file extension/types 
- View all public files
- Download public files
- Delete files only belonging to user


## Design Choices
- Store images on MongoDB with the filename, author and reference to the author object in the entry
- Use JWT session tokens to authenticate requests made to server


## To-Do
- Make frontend more user friendly 
- Add option to change visibility of an uploaded image
- Implement security measures for information stored in database (hashing image data, user data)



## Additional Documentation

- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/
- Express - https://expressjs.com/
- Bootstrap CSS - https://getbootstrap.com/
