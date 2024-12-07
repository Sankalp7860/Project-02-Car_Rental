require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.generateToken = (userId) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: '24h' });
  return token;
};

exports.verifyToken = (token, callback) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
};