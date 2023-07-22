// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Please log in.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key_here');
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

exports.authorizeAdmin = (req, res, next) => {    
    try {
      console.log(req.user.role);
      if ("admin"!==(req.user.role)) {
        res.status(403).json({
          message: "Protected route! Admin access required.",
        });
      } else {
        next();
      }
    } 
    catch (error) {      
      res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
  
};

