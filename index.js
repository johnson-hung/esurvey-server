// Get access to the express library
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

// Connect Mongoose to MongoDB
mongoose.connect(keys.mongoURI);

// Generate a running express app
const app = express(); 

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in [ms]
        keys: [keys.cookieKey] // Pick keys randomly
    })
);
// Tell passport to use cookie to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// 'require' returns a function, and we immediately call it with the app object
require('./routes/authRoutes')(app);

// Set port number injected in the environment (Production / Development)
const PORT = process.env.PORT || 5001; 

// Instruct express to tell node to listen to the given port
app.listen(PORT);