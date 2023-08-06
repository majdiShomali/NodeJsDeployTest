const jwt = require("jsonwebtoken");

const SECRETKEY = process.env.SECRETKEY;
module.exports = (req,res,next)=>{
  const token = req.headers.authorization.trim();
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  jwt.verify(token, SECRETKEY, (err, decoded) => {
    if (err) {
      console.log("token error:", err); // Log the error object for debugging
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }
    req.user=decoded
    next();  
  });
  };