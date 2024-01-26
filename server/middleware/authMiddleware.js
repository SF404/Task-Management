const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');
  console.log(authorizationHeader)

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
