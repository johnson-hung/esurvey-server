// Helpers for handling auth in express app
const passport = require('passport'); 

// Specific method for authenticating
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const keys = require('../config/keys');

const mongoose = require('mongoose');

// Model class -> collection
const User = mongoose.model('users');

// Set configuration for google strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        // Make query to MongoDB (asynchronous, returns a promise)
        User.findOne({ googleID: profile.id }).then((existingUser) => {
            if (existingUser){
                done(null, existingUser); // Tell passport that we're done
            }
            else{
                // Create model instance -> record
                new User({ googleID: profile.id })
                    .save() // Take the instance and save it to DB
                    .then((user) => done(null, user));
            }
        });
    })
);