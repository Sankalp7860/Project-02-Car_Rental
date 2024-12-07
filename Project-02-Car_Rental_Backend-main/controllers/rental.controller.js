const Rental = require("../models/rental.model");
const Payment = require("../models/payment.model");
const Car = require("../models/car.model");
const db = require("../config/db.config");

exports.rentCar = (req, res) => {
  const { car_id, start_date, end_date } = req.body;
  const customer_id = req.customer_id; // Assuming the customer ID is available in req.customer_id

  // Calculate the total cost
  const rentDuration = calculateRentDuration(start_date, end_date);
  // const total_cost = calculateTotalCost(rentDuration, car_id);
  var total_cost = 0;
  db.query("SELECT * FROM cars WHERE car_id = ?", car_id, (err, result) => {
    if (err) {
      console.error("Error fetching car:", err);
      return;
    }
    total_cost = rentDuration * result[0].daily_rate;

    const newRental = {
      car_id,
      customer_id,
      start_date,
      end_date,
      total_cost,
    };

    req.rental = newRental;

    Rental.create(newRental, (err, rental) => {
      if (err) {
        res.status(500).json({ error: "Error creating rental" });
        return;
      }

      Car.updateStatus(car_id, "Rented", (err) => {
        if (err) {
          res.status(500).json({ error: "Error updating car status" });
          return;
        }

        console.log(rental);
        res
          .status(201)
          .json({ message: "Car rented successfully", id: rental.id });
      });
    });

    // Update the car status to "Rented"
  });
};

exports.makePayment = (req, res) => {
  const { rental_id, payment_method } = req.body;
  console.log(req.body);
  const payment_date = new Date();
  // const amount = req.rental.total_cost; // Assuming the total cost is available in req.rental
  var amount = 0;
  db.query(
    "SELECT * FROM rentals WHERE rental_id = ?",
    rental_id,
    (err, result) => {
      if (err) {
        console.error("Error fetching rental:", err);
        return;
      }
      amount = result[0].total_cost;

      const newPayment = {
        rental_id,
        payment_date,
        payment_method,
        amount,
      };

      Payment.create(newPayment, (err, payment) => {
        if (err) {
          res.status(500).json({ error: "Error making payment" });
          return;
        }

        res.status(201).json({ message: "Payment successful", payment });
      });
    }
  );
};

// Helper functions
function calculateRentDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const rentDuration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return rentDuration;
}


// exports.getRentalsByCustomerId = (req, res) => {
//   const customer_id = req.customer_id; // Assuming the customer ID is available in req.customer_id

//   Rental.findByCustomerId(customer_id, (err, rentals) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).json({ message: "No rentals found" });
//       } else {
//         res.status(500).json({ error: "Error retrieving rentals" });
//       }
//       return;
//     }

//     res.status(200).json(rentals);
//   });
// }