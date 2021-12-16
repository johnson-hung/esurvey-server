// Get access to the express library
const express = require('express'); 
const mongoose = require('mongoose');
const keys = require('./config/keys');

// Simply import passport
require('./services/passport');

// Connect Mongoose to MongoDB
mongoose.connect(keys.mongoURI);

// Generate a running express app
const app = express(); 

// 'require' returns a function, and we immediately call it with the app object
require('./routes/authRoutes')(app);

// Set port number injected in the environment (Production / Development)
const PORT = process.env.PORT || 5001; 

// Instruct express to tell node to listen to given port
app.listen(PORT); 