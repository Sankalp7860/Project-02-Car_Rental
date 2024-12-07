const db = require('../config/db.config');

const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.phone = user.phone;
  this.address = user.address;
  this.city = user.city;
  this.zip_code = user.zipCode;
};

User.create = (newUser, result) => {
  db.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.error('Error creating user:', err);
      result(err, null);
      return;
    }

    console.log('Created user:', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, result) => {
  db.query('SELECT * FROM users WHERE email = ?', email, (err, res) => {
    if (err) {
      console.error('Error finding user by email:', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('Found user:', res[0]);
      result(null, res[0]);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};


User.updateByEmail = (email, newUser, result) => {
  console.log(newUser);
  let updateQuery = 'UPDATE users SET ? WHERE email = ?';
  db.query(updateQuery, [newUser, email], (err, res) => {
    if (err) {
      console.error('Error updating user by email:', err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // no rows were updated, hence the user was not found
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Updated user:', { email: email, ...newUser });
    result(null, { email: email, ...newUser });
  });
};

module.exports = User;