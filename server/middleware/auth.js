// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('x-auth-token');
  
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.userId = decoded.userId;
    next(); // This should be here, not inside a JSON object
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};