import React from "react";
import { Link } from "react-router-dom";
import CarPng from "../assets/white-car.png";
import "./About.css";
const About = () => {
	return (
		<div
			className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300"
			style={{ backgroundColor: "rgb(17 17 17 / var(--tw-bg-opacity))" }}
		>
			<div className="container">
				<div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
					<div data-aos="slide-right" data-aos-duration="1500">
						<img
							src={CarPng}
							alt=""
							className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
						/>
					</div>
					<div>
						<div className="space-y-5 sm:p-16 pb-6">
							<h1
								data-aos="fade-up"
								className="text-3xl sm:text-4xl font-bold font-serif"
								style={{ color: "#f60838" }}
							>
								About us
							</h1>
							<p data-aos="fade-up" className="leading-8 tracking-wide">
								At CruiseUp, we're more than just a vehicle rental service;
								we're your trusted partner in every journey. With a passion for
								excellence and a commitment to customer satisfaction, we offer a
								diverse fleet of vehicles to suit every need and preference.
							</p>
							<p data-aos="fade-up" className="leading-8 tracking-wide">
								Whether you're embarking on a business trip, a family vacation,
								or a weekend getaway, we provide top-notch vehicles equipped
								with the latest amenities for your comfort and convenience.
							</p>
							<Link to="/cars">
								<button
									data-aos="fade-up"
									className="button-outline-about"
									
								>
									Get Started
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
