// prod.js - production keys here

// Export code and make it available to other files in our application
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.GOOGLE_MONGO_URI,
    cookieKey: process.env.GOOGLE_COOKIE_KEY
};