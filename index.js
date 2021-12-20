// Get access to the express library
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

// Connect Mongoose to MongoDB
mongoose.connect(keys.mongoURI);

// Generate a running express app
const app = express(); 

// Middleware
app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production'){
    // Express will serve up production assets like our main.js file
    app.use(express.static('client/build'));

    // Express will serve up the index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

// Set port number injected in the environment (Production / Development)
const PORT = process.env.PORT || 5001; 

// Instruct express to tell node to listen to the given port
app.listen(PORT);