// SELECT CARS.car_id, CARS.status, users.customer_id, users.name, users.email FROM CARS JOIN RENTALS ON CARS.car_id = RENTALS.car_id JOIN users ON RENTALS.customer_id = users.customer_id WHERE CARS.status = 'Rented';
// SELECT CARS.car_id, rentals.start_date,rentals.end_date,rentals.total_cost, users.customer_id, users.name, users.email FROM CARS JOIN RENTALS ON CARS.car_id = RENTALS.car_id JOIN users ON RENTALS.customer_id = users.customer_id WHERE CARS.status = 'Rented' and cars.car_id = ?
// SELECT * FROM CARS JOIN RENTALS ON CARS.car_id = RENTALS.car_id JOIN users ON RENTALS.customer_id = users.customer_id WHERE CARS.status = "Rented" and cars.car_id = ? order by rentals.start_date desc limit 1

// SELECT CARS.*, RENTALS.start_date, RENTALS.end_date, RENTALS.total_cost, USERS.name as customer_name FROM CARS LEFT JOIN RENTALS ON CARS.car_id = RENTALS.car_id LEFT JOIN USERS ON RENTALS.customer_id = USERS.customer_id WHERE CARS.PROVIDER_ID = ?


const User = require('../models/user.model');
const db = require('../config/db.config');

exports.getUserProfile = (req, res) => {
  const email = req.email;

  User.findByEmail(email, (err, user) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'Error retrieving user' });
      }
      return;
    }

    console.log(user);

    db.query('SELECT cars.*, rentals.start_date, rentals.end_date, rentals.total_cost, users.name as customer_name FROM cars LEFT JOIN rentals ON cars.car_id = rentals.car_id LEFT JOIN users ON rentals.customer_id = users.customer_id WHERE cars.provider_id = ?',user.customer_id,(err,rows)=>{
      if(err){
        console.log(err);
        return;
      }
      user.cars = rows;
      // console.log(user);
    //  res.status(200).json(user);
    
    db.query('SELECT * FROM cars JOIN rentals ON cars.car_iD = rentals.car_id WHERE rentals.customer_id = ? ORDER BY rentals.end_date DESC', user.customer_id, (err, rows2) => {
      if(err){
        console.log(err);
        return;
      }
      user.rented_cars = rows2;
      console.log(user);
      res.status(200).json(user);
    });
    
    }); 
  });
};

exports.updateUserProfile = (req, res) => {
  const email = req.email;
  const { name, phone, address, city, zip_code } = req.body;

  const updatedUser = {
    name,
    phone,
    address,
    city,
    zip_code
  };

  User.updateByEmail(email, updatedUser, (err, user) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'Error updating user' });
      }
      return;
    }

    res.status(200).json({ message: 'User profile updated successfully' });
  });
};



