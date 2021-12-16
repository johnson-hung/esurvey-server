const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
const { Schema } = mongoose; // Destruction

const userSchema = new Schema({
    googleID: String
});

// Create new collection called 'users' if it doesn't exist
mongoose.model('users', userSchema);