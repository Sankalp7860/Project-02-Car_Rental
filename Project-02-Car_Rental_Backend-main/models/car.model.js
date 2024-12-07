const db = require('../config/db.config');

const Car = function(car) {
  this.make = car.make;
  this.model = car.model;
  this.year = car.year;
  this.color = car.color;
  this.daily_rate = car.dailyRate;
  this.provider_id = car.provider_id;
  this.image_url = car.image_url;
};

Car.create = (newCar, result) => {
  db.query('INSERT INTO cars SET ?', newCar, (err, res) => {
    if (err) {
      console.error('Error creating car:', err);
      result(err, null);
      return;
    }

    console.log('Created car:', { id: res.insertId, ...newCar });
    result(null, { id: res.insertId, ...newCar });
  });
};

Car.findAll = (provider_id,result) => {
  console.log(provider_id);
  db.query('SELECT * FROM cars WHERE status = "Available" and provider_id <> ? ',[provider_id],(err, res) => {
    if (err) {
      console.error('Error retrieving cars:', err);
      result(err, null);
      return;
    }

    console.log('Retrieved cars:', res);
    result(null, res);
  });
};

Car.updateStatus = (car_id, status, result) => {
  db.query(
    'UPDATE cars SET status = ? WHERE car_id = ?',
    [status, car_id],
    (err, res) => {
      if (err) {
        console.error('Error updating car status:', err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // Car not found with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('Updated car status:', { car_id, status });
      result(null, { car_id, status });
    }
  );
};


module.exports = Car;