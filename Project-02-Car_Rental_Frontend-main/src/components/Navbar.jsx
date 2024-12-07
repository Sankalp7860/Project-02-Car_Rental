import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../logo.png";
import logo1 from "../assets/1.png";
import logo2 from "../assets/2.png";
import "./Navbar.css";
import { isAuthenticated } from "../utils/auth.utils";
import { useState, useEffect } from "react";

function Navbar() {
	const isAuth = isAuthenticated();
	const [shouldReload, setShouldReload] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/login" || location.pathname === "/logout") {
			setShouldReload(true);
		}
	}, [location.pathname]);

	useEffect(() => {
		if (shouldReload) {
			// Reload your navbar component here
			console.log("Navbar component reloaded");
			setShouldReload(false);
		}
	}, [shouldReload]);

	return (
		<nav>
			<div className="nav-brand">
				<img src={logo2} alt="Company Logo" className="image"/>
					<h3 className="logo">
						<span>Cruise</span>Up
					</h3>
			</div>
			<div className="nav-links">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					{!isAuth && (
						<>
							<li>
								<Link to="/login">Login</Link>
							</li>
							<li>
								<Link to="/register">Register</Link>
							</li>
						</>
					)}
					{isAuth && (
						<>
							<li>
								<Link to="/profile">Profile</Link>
							</li>
							<li>
								<Link to="/add-car">Add Car</Link>
							</li>
							<li>
								<Link to="/cars">Available Cars</Link>
							</li>
							<li>
								<Link to="/logout">Logout</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
