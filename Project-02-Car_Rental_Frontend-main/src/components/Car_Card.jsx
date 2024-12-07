import React from "react";
import { updateCarStatus } from "../services/car.service";
import "./card.css";
import {
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBCardImage,
	MDBBtn,
	MDBRipple,
} from "mdb-react-ui-kit";

export default function Car_Card({ car }) {
	const [carStatus, setcarStatus] = React.useState(car.status);

	const deleteCar = async () => {
		try {
			const data = {
				car_id: car.car_id,
				status: carStatus == "Maintainance" ? "Available" : "Maintainance",
			};
			const response = await updateCarStatus(data);
			if (response.statusText == "OK") {
				// alert("Car Sent For Maintainance");
				// car.status=data.status;
				setcarStatus(data.status);
				console.log("hi");
				// window.location.reload();
			}
		} catch (error) {
			console.error(error);
			// alert(error);
		}
	};
	return (
		<div className="car_card_css">
			<MDBCard className="carcard ">
				<MDBRipple
					rippleColor="light"
					rippleTag="div"
					className="bg-image hover-overlay"
				>
					<MDBCardImage
						className="img-car"
						src={car.image_url}
						fluid
						alt="..."
					/>
					<a>
						<div className="mask"></div>
					</a>
				</MDBRipple>
				<MDBCardBody>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							gap: "10px",
						}}
					>
						{car.total_cost > 0 && car.status!="Available" &&(
							<>
								<MDBCardTitle>
									{"~ " + car.make + " (" + car.model + ")"}
								</MDBCardTitle>
								<ul>
									<li>
										{"Start Date - " +
											new Date(car.start_date).toLocaleDateString()}
									</li>
									<li>
										{"End Date - " +
											new Date(car.end_date).toLocaleDateString()}
									</li>
									<li>{"Total Cost - ₹" + car.total_cost}</li>
								</ul>
							</>
						)}

						{car.total_cost > 0 && car.status=="Available" && (
							<>
              <MDBCardTitle>{"~ " + car.make}</MDBCardTitle>
              <ul>
                <li>{"Car Number - " + car.model}</li>
                <li>{"Year - " + car.year}</li>
                <li>{"Daily Rate - ₹" + car.daily_rate}</li>
              </ul>
            </>
						)}

						{car.total_cost == null && (
							<>
								<MDBCardTitle>{"~ " + car.make}</MDBCardTitle>
								<ul>
									<li>{"Car Number - " + car.model}</li>
									<li>{"Year - " + car.year}</li>
									<li>{"Daily Rate - ₹" + car.daily_rate}</li>
								</ul>
							</>
						)}

						<button
							style={{
								backgroundColor: carStatus == "Rented" ? "#03C988" : "#3388FF",
								color: "white",
							}}
							type="button"
							class="btn w-100"
							data-mdb-ripple-init
						>
							<b>
								{carStatus == "Rented"
									? "Rented By " + car.customer_name
									: carStatus == "Maintainance"
									? "Under Maintainance"
									: "Available"}
							</b>
						</button>
						<button
							style={{
								backgroundColor: "yellow",
								color: "black",
							}}
							type="button"
							class="btn w-100"
							data-mdb-ripple-init
							{...(carStatus == "Rented" ? { disabled: true } : {})}
							onClick={deleteCar}
						>
							<b>
								{carStatus == "Maintainance"
									? "Make It Available"
									: "Send For Maintainance"}
							</b>
						</button>
					</div>
				</MDBCardBody>
			</MDBCard>
		</div>
	);
}
