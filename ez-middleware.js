// middlewares/ez-middleware.js
const midOne = (req, res, next) => {
    console.log("Middleware midOne executed:", req.method, req.url);
    next();
  };
  
  module.exports = { midOne };