// Get access to the express library
const express = require('express'); 

// Helpers for handling auth in express app
const passport = require('passport'); 

// Specific method for authenticating
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const keys = require('./config/keys');

// Generate a running express app
const app = express(); 

// Set configuration for google strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        console.log('User authenticated');
        console.log('accessToken:', accessToken);
        console.log('refreshToken:', refreshToken);
        console.log('profile:', profile);
    })
);

// Example of route handler:
// app.get      -> Get info 
//    .post     -> Send info
//    .put      -> Update all the properties of something
//    .delete   -> Delete something
//    .patch    -> Update one or two properties of something

// Go and find google strategy
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'] 
    })
);

// Handle oauth callback
app.get('/auth/google/callback', passport.authenticate('google'));

// Set port number injected in the environment (Production / Development)
const PORT = process.env.PORT || 5001; 

// Instruct express to tell node to listen to port:5001
app.listen(PORT); 