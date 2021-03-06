const passport = require('passport');

// Assume express app will call this function
module.exports = (app) => {
    // Example of route handlers:
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
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout/', (req, res) => {
        // Take cookie containing user.id and kill the id
        req.logout();
        res.redirect('/'); // Back to the root route
    });
};
