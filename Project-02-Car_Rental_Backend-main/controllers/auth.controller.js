const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('../utils/jwt.utils');

exports.register = (req, res) => {
  const { name, email, password, phone, address, city, zipCode } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: 'Error hashing password' });
      return;
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      zipCode
    });

    console.log(newUser);

    User.create(newUser, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Error creating user' });
        return;
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'Error finding user' });
      }
      return;
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).json({ error: 'Error comparing passwords' });
        return;
      }

      if (!isMatch) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      const token = jwt.generateToken(user.email);
      res.status(200).json({ token });
    });
  });
};