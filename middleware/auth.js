const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = {
   isLoggedIn: async (req, res, next) => {
      const token = req.header("x-auth-token");
      if(!token) {
         return res.status(401).json({msg: "No token"});
      } else {
         try {
            const decoded = jwt.verify(token, config.get("secret"));
            req.user = decoded.user;
            if(req.user) {
               next();
            } else {
               res.status(403).json({ msg: "You do not have the right permission to access this resource" });
            }
         } catch (error) {
            console.error(error.message);
            return res.status(401).json({msg: 'Invalid Token'});
         }
      }
   },
   isTST: async (req, res, next) => {
      const token = req.header("x-auth-token");
      if(!token) {
         return res.status(401).json({msg: "No token"});
      } else {
         try {
            const decoded = jwt.verify(token, config.get("secret"));
            req.user = decoded.user;
            if(req.user.role === 'TST') {
               next();
            } else {
               res.status(403).json({ msg: "You do not have the right permission to access this resource" });
            }
         } catch (error) {
            console.error(error.message);
            return res.status(401).json({msg: 'Invalid Token'});
         }
      }
   },
   isMP: async (req, res, next) => {
      const token = req.header("x-auth-token");
      if(!token) {
         return res.status(401).json({msg: "No token"});
      } else {
         try {
            const decoded = jwt.verify(token, config.get("secret"));
            req.user = decoded.user;
            if(req.user.role === "MP") {
               next();
            } else {
               res.status(403).json({msg: "You do not have the right permission to access this resource"});
            }
         } catch (error) {
            console.error(error.message);
            return res.status(401).json({msg: 'Invalid Token'});
         }
      }
   }
}