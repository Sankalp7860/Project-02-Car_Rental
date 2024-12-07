import React, { useState } from "react";
import { rentCar, makePayment } from "../services/rental.service";
import { useLocation } from "react-router-dom";
import "./RegistrationForm.css";
import { MdPayment } from "react-icons/md";

function RentCarForm() {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carId = new URLSearchParams(location.search).get("carId");
    const today = new Date().toISOString().split("T")[0];

    if (startDate < today) {
      setError("Start date cannot be before today's date.");
      return;
    }

    if (endDate <= startDate) {
      setError("End date must be after the start date.");
      return;
    }

    try {
      const car_id = carId;
      const start_date = startDate;
      const end_date = endDate;
      const rental = await rentCar({ car_id, start_date, end_date });
      console.log(rental);
      await makePayment({
        rental_id: rental.id,
        payment_method: paymentMethod,
      });
      setError("Car rented successfully");
      // Reset form fields
      setStartDate("");
      setEndDate("");
      setPaymentMethod("");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    }}>
      {error && <div style={{
        marginTop: "20px",
        fontWeight: "800",
        fontSize: "1.1rem",
      }}>{error}</div>}

      <div className="centralized">
        <div className="wrapper">
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Rent Car</h1>
            <div className="input-box">
              <label htmlFor="start_date" className="rent-label">
                Start Date:
              </label>
              <input
                className="rent-box"
                type="date"
                id="start_date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                disabled
              />
            </div>
            <div className="input-box">
              <label htmlFor="end_date" className="rent-label">
                End Date:
              </label>
              <input
                className="rent-box"
                type="date"
                id="end_date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                style={{
                  appearance: "none",
                  backgroundColor: "transparent",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "40px",
                  color: "white",
                  padding: "10px 35px 10px 15px",
                  width: "100%",
                }}
              >
                <option value="" disabled>
                  Select Payment Method
                </option>
                <option value="cash">Cash on Delivery</option>
                <option value="online">Online Payment</option>
              </select>
              <MdPayment className="icon" />
            </div>
            <button type="submit">Rent Car</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RentCarForm;
