import React from "react";
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

export default function Car_Rented({ car }) {
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
            <MDBCardTitle>{"~ "+car.make +" ("+ car.model+")"}</MDBCardTitle>
            <ul>
              <li>{"Start Date - "+(new Date(car.start_date)).toLocaleDateString()}</li>
              <li>{"End Date - "+(new Date(car.end_date)).toLocaleDateString()}</li>
              <li>{"Total cost : "+"₹"+car.total_cost}</li>
            </ul>
            {/* <MDBBtn className="w-100" href="#">{car.status}</MDBBtn> */}
            <button
              style={{
                backgroundColor:"#03C988",
                color:  "white",
              }}
              type="button"
              class="btn w-100"
              data-mdb-ripple-init
            >
              <b>RENTED</b>
            </button>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
