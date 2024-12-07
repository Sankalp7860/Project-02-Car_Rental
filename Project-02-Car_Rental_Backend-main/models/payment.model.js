const db = require('../config/db.config');

const Payment = function(payment) {
  this.rentalId = payment.rentalId;
  this.paymentDate = payment.paymentDate;
  this.paymentMethod = payment.paymentMethod;
  this.amount = payment.amount;
};

Payment.create = (newPayment, result) => {
  db.query('INSERT INTO payments SET ?', newPayment, (err, res) => {
    if (err) {
      console.error('Error creating payment:', err);
      result(err, null);
      return;
    }

    console.log('Created payment:', { id: res.insertId, ...newPayment });
    result(null, { id: res.insertId, ...newPayment });
  });
};

module.exports = Payment;