// Helpers for handling auth in express app
const passport = require('passport'); 

// Specific method for authenticating
// (Remember that OAuth's only purpose is to allow someone to sign in.
// After that, we use our own internal id)
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const keys = require('../config/keys');

const mongoose = require('mongoose');

// Model class -> collection
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    // user.id is not the same as profile.id, it's a shortcut to the ID
    // assigned to a record by MongoDB
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Set configuration for google strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true // Trust the proxy to calculate callback URL correctly
    }, 
    (accessToken, refreshToken, profile, done) => { // Google strategy callback function
        // Make query to MongoDB (asynchronous, returns a promise)
        User.findOne({ googleID: profile.id })
            .then((existingUser) => {
                if (existingUser){
                    done(null, existingUser); // Tell passport that we're done
                }
                else{
                    // Create model instance -> record
                    new User({ googleID: profile.id })
                        .save() // Take the instance and save it to DB
                        .then((user) => done(null, user));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    })
);