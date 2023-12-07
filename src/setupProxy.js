const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://hrku-cap-badbank-24d2d96dbd11.herokuapp.com', // Specify the base URL to be intercepted by the proxy
    createProxyMiddleware({
      target: process.env.REACT_APP_MONGO_URL, // Replace with your actual backend URL
      changeOrigin: true,
    })
  );
};
