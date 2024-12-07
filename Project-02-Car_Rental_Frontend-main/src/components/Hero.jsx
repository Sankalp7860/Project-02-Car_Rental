import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import carPng from "../assets/car.png";
import AOS from "aos";
import "./Hero.css";
const Hero = () => {
	useEffect(() => {
		AOS.refresh();
	});
	return (
		<div className="dark:bg-black dark:text-white duration-300 ">
			<div className="container min-h-[620px] flex">
				<div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
					<div
						data-aos="zoom-in"
						data-aos-duration="1500"
						data-aos-once="false"
						className="order-1 sm:order-2"
						style={{ position: "relative", right: "-90%" }}
					>
						<img
							src={carPng}
							alt=""
							className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
						/>
					</div>
					<div
						className="space-y-5 order-2 sm:order-1 sm:pr-32 "
						style={{ position: "relative", right: "110%" }}
					>
						<p
							data-aos="fade-up"
							className=" text-2xl font-serif"
							style={{ color: "#f60838" }}
						>
							Effortless
						</p>
						<h1
							data-aos="fade-up"
							data-aos-delay="600"
							className="text-5xl lg:text-7xl font-semibold font-serif"
						>
							Car Rental
						</h1>
						<p
							data-aos="fade-up"
							data-aos-delay="1000"
							style={{
								fontFamily: "cursive",
								fontWeight: "500",
								fontSize: "20px",
							}}
						>
							Drive Your Dreams with Our Premier Car Rental Service <br /> -
							Where Every Journey Begins with Comfort and Style!{" "}
						</p>
						<Link to="/cars">
							<button
								data-aos="fade-up"
								data-aos-delay="1500"
								onClick={() => {
									AOS.refreshHard();
								}}
								className="rounded-md  hover:bg-primary/80 transition duration-500 py-2 px-6 text-white hero-btn"
								
								
							>
								Get Started
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
