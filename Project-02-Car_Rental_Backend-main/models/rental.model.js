const db = require('../config/db.config');

const Rental = function(rental) {
  this.car_id = rental.car_id;
  this.customer_id = rental.customer_id;
  this.start_date = rental.start_date;
  this.end_date = rental.end_date;
  this.total_cost = rental.total_cost;
};

Rental.create = (newRental, result) => {
  db.query('INSERT INTO rentals SET ?', newRental, (err, res) => {
    if (err) {
      console.error('Error creating rental:', err);
      result(err, null);
      return;
    }

    console.log('Created rental:', { id: res.insertId, ...newRental });
    result(null, { id: res.insertId, ...newRental });
  });
};

// Rental.findByCustomerId = (customer_id, result) => {
//   db.query('SELECT * FROM rentals WHERE customer_id = ?', customer_id, (err, res) => {
//     if (err) {
//       console.error('Error finding rentals by customer id:', err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log('Found rentals:', res);
//       result(null, res);
//     } else {
//       result({ kind: 'not_found' }, null);
//     }
//   });
// };

module.exports = Rental;