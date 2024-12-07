import React from "react";
import { Link } from "react-router-dom";
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
import {useNavigate} from "react-router-dom";

export default function AvailableCarsCard({ car }) {
  const navigate = useNavigate();
  
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
            <MDBCardTitle style={{fontSize:"23px",fontWeight:"700"}}>{"~ " + car.make}</MDBCardTitle>
            <ul>
              <li>{"Car No. - " + car.model}</li>
              <li>{"Year - " + car.year}</li>
              <li>{"Daily Rate - ₹" + car.daily_rate}</li>
            </ul>
            {/* <MDBBtn className="w-100" href="#">{car.status}</MDBBtn> */}
            <button
              type="button"
              className="btn w-100 btn-primary"
              data-mdb-ripple-init
              onClick={() => {
                navigate(`/rent-car?carId=${car.car_id}`);
              }}
            >
              {/* <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                to={`/rent-car?carId=${car.car_id}`}
              >
                Rent
              </Link> */}
              Rent
            </button>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
