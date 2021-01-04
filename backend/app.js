const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const flash = require('express-flash');
const expressSession = require('express-session')
const passport = require('passport')
const cors = require('cors');
const app = express();


require('./config/passport-config')(passport);

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "build")));


// Initialize session and passport.js
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



/* 
// TODO Web Template Studio: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
  
  require('dotenv').config();
  
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
} */


// Routes
app.use('/images', require('./routes/images'));
app.use('/users', require('./routes/users'));
app.get("/ping", (req,res)=>{
  res.sendStatus(400);

});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
