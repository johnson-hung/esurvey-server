// Helpers for handling auth in express app
const passport = require('passport'); 

// Specific method for authenticating
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const keys = require('../config/keys');

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