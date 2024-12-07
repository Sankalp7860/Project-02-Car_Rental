import React, { useState, useEffect } from "react";
import { getAvailableCars } from "../services/car.service";
import { Link } from "react-router-dom";
import CarStr from "./CarStr";
import AvailableCarsCard from "./AvailableCarsCard";

function CarList() {
	const [cars, setCars] = useState([]);
	const [error, setError] = useState("");
	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchAvailableCars = async () => {
		  try {
			const cars = await getAvailableCars();
			setCars(cars);
		  } catch (error) {
			if (error.response && error.response.data) {
			  setError(error.response.data.error);
			} else {
			  setError(error.message || 'An unknown error occurred');
			}
		  }
		};
	  
		fetchAvailableCars();
	  }, []);

	return (
		<div>
			{error && <div>{error}</div>}
			<div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
      
      }}>
				{cars.map((car) => (
					<AvailableCarsCard key={car.car_id} car={car} />
				))}
			</div>
		</div>
	);
}

export default CarList;
