const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = function(req, res, next) {
   const token = req.header("x-auth-token");
   if(!token) {
      return res.status(401).json({msg: "No token"});
   } else {
      try {
         const decoded = jwt.verify(token, config.get("secret"));
         req.user = decoded.user;
         console.log(req.user);

         next();
      } catch (error) {
         console.error(error.message);
         res.status(401).json({msg: 'Invalid Token'});
      }
   }
}