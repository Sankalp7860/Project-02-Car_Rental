const Car = require('../models/car.model');

exports.createCar = (req, res) => {
  const { make, model, year, color, dailyRate,image_url } = req.body;
  const daily_rate = dailyRate;
  console.log(req.customer_id);
  const provider_id = req.customer_id;

  const newCar = {
    make,
    model,
    year,
    color,
    daily_rate,
    provider_id,
    image_url,
    status: 'Available'
  };
  console.log(newCar);
  Car.create(newCar, (err, car) => {
    if (err) {
      res.status(500).json({ error: 'Error creating car' });
      return;
    }

    res.status(201).json({ message: 'Car created successfully', car });
  });
};

exports.getAvailableCars = (req, res) => {
  Car.findAll(req.customer_id,(err, cars) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving cars' });
      return;
    }

    res.status(200).json(cars);
  });
};

exports.updateCarStatus = (req, res) => {
  const { car_id, status } = req.body;

  Car.updateStatus(car_id, status, (err, car) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).json({ error: `Car with id ${car_id} not found` });
        return;
      }

      res.status(500).json({ error: 'Error updating car status' });
      return;
    }

    res.status(200).json({ message: 'Car status updated successfully', car });
  });
}