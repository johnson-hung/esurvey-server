// No need to import this file anywhere, CRA will look for this and load it
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app){
    // Direct request from react side to express api by using proxy (dev)
    // NOTE: We only need to do this for development environment
    // because CRA server doesn't exist in production
    app.use(
        ["/api", "/auth/google"],
        createProxyMiddleware({
            target: "http://localhost:5001"
        })
    );
};