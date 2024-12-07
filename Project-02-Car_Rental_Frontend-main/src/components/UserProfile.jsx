import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/user.service";
import CarStr from "./CarStr";
import ToggleButtonCar from "./ToggleButton";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationCity } from "react-icons/md";
import { PiAddressBookFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import "./RegistrationForm.css";

function UserProfile() {
  const [rentedCars , setRentedCars] = useState([]);
  const [cars, setCars] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState('web'); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setName(userProfile.name);
        setEmail(userProfile.email);
        setPhone(userProfile.phone);
        setAddress(userProfile.address);
        setCity(userProfile.city);
        setZipCode(userProfile.zip_code);
        setCars(userProfile.cars);
        setRentedCars(userProfile.rented_cars);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const zip_code = zipCode;
      await updateUserProfile({ name, phone, address, city, zip_code });
      setError("Profile updated successfully");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {error && <div>{error}</div>}
      <ToggleButtonCar onViewChange={setView} />
      {view === 'web' && (
        <div className="centralized  login-page" style={{width:"90%"}}>
          <div className="wrapper">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1>User Profile</h1>
              <div className="input-box">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="email" placeholder="Email" value={email} disabled />
                <MdEmail className="icon" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <FaPhoneAlt className="icon" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <PiAddressBookFill className="icon" />
              </div>
              <div>
                <div className="input-box city">
                  <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                  <MdLocationCity className="icon" />
                </div>
                <div className="input-box zip">
                  <input type="text" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                  <FaLocationDot className="icon" />
                </div>
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      )}
      {(view === 'android' || view === 'ios') && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginTop:"10px"
          }}>{view === 'android' ? 'Owned Cars' : 'Rented Cars'}:</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {view === 'android' ? <CarStr sec="Owned" cars={cars}/> : <CarStr sec="Rented" cars={rentedCars}/>}
            {/* <CarStr cars={cars}/> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
