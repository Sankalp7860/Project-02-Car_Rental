const jwt = require('../utils/jwt.utils');
const db = require('../config/db.config');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verifyToken(token, (err, decoded) => {
    if (err) {
      
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.email = decoded.userId;
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [decoded.userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (result.length === 0) {
        return res.status(403).json({ error: 'Invalid token' });
      }

      console.log(result);
      const custid = result[0].customer_id;
      req.customer_id = custid;
      next();
    });

    // req.email = decoded.userId;
    // console.log(decoded);
    // next();
  });
};