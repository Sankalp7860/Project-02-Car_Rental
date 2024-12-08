import React from 'react'
import './Footer1.css'
const Footer1 = () => {
    return (
        <>
            <div className="Footer" >
                <div className="container" >
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>Cruise</span>Up</h3>
                            <p style={{fontFamily:"cursive"}}>Drive Your Dreams with Our Premier Car Rental Service - Where Every Journey Begins with Comfort and Style!</p>
                            <div className="footer-icons">
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="/cars">Explore</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/profile">Services</a>
                                </li>
                                
                                <li className="nav-item">
                                    <a className="" href="/">Contact Us</a>
                                </li>
                                
                                
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Contact Us</h5>
                            <p><i className="fa-solid fa-phone-volume"></i> +91 8858371818</p>
                            <p><i className="fa-solid fa-envelope"></i> cruiseup07@gmail.com</p>
                            <p><i className="fa-solid fa-paper-plane"></i> Guwahati,India.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer1
