const express = require('express'); // Get access to the express library
const app = express(); // Generate a running express app

// Example of route handler:
// app.get      -> Get info 
//    .post     -> Send info
//    .put      -> Update all the properties of something
//    .delete   -> Delete something
//    .patch    -> Update one or two properties of something
app.get('/', (req, res) => {
    res.send({hey: 'you'});
});

// Set port number injected in the environment (Production / Development)
const PORT = process.env.PORT || 5001; 

app.listen(PORT); // Instruct express to tell node to listen to port:5001