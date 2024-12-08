import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as reg } from "../services/auth.service";
import "./RegistrationForm.css";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationCity } from "react-icons/md";
import { PiAddressBookFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { useLoading } from "../utils/LoadingContext";

const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(5, "Zip code must be at least 5 digits"),
});

function RegistrationForm() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoading(); // Use loading context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      showLoader(); // Show loader during registration
      await reg(data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      hideLoader(); // Hide loader after registration
    }
  };

  return (
    <div className="centralized">
      <div className="wrapper">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>SignUp</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              required
            />
            <FaUser className="icon" />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              required
            />
            <MdEmail className="icon" />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Phone"
              {...register("phone")}
              required
            />
            <FaPhoneAlt className="icon" />
            {errors.phone && <span>{errors.phone.message}</span>}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Address"
              {...register("address")}
              required
            />
            <PiAddressBookFill className="icon" />
            {errors.address && <span>{errors.address.message}</span>}
          </div>
          <div>
            <div className="input-box city">
              <input
                type="text"
                placeholder="City"
                {...register("city")}
                required
              />
              <MdLocationCity className="icon" />
              {errors.city && <span>{errors.city.message}</span>}
            </div>
            <div className="input-box zip">
              <input
                type="text"
                placeholder="Zip Code"
                {...register("zipCode")}
                required
              />
              <FaLocationDot className="icon" />
              {errors.zipCode && <span>{errors.zipCode.message}</span>}
            </div>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              required
            />
            <FaLock className="icon" />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button type="submit">SignUp</button>
          <div className="login-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
