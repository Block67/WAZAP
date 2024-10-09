const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

// Verify JWT Token
const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
