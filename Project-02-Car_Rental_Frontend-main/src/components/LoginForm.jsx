import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { setToken } from "../utils/auth.utils";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "../utils/LoadingContext";

function LoginForm() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoading(); // Use loading context
  const [error, setError] = useState("");

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  const handleSubmit1 = async (data) => {
    console.log(data);
    try {
      showLoader(); // Show loader when login starts
      const { token } = await login(data.email, data.password, showLoader, hideLoader);
      setToken(token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
    } finally {
      hideLoader(); // Hide loader when login completes
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="centralized">
      <div className="wrapper">
        <form
          onSubmit={handleSubmit(handleSubmit1)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error && <div>{error}</div>}
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              {...register("email")}
            />
            <FaUser className="icon" />
          </div>
          <div>{errors.email && <span>{errors.email.message}</span>} </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              {...register("password")}
            />
            <FaLock className="icon" />
          </div>
          <div>{errors.password && <span>{errors.password.message}</span>}</div>
          <button
            type="submit"
            style={{
              marginTop: "15px",
            }}
          >
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="/register">SignUp</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
