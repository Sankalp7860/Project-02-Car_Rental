import React, { useState } from "react";
import { z } from "zod";
import { addCar } from "../services/car.service";
import UploadImage2 from "./UploadImage2";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import "./RegistrationForm.css";
import { IoLogoModelS } from "react-icons/io";
import { MdOutlineAccessTimeFilled, MdInvertColors } from "react-icons/md";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { LuFileInput } from "react-icons/lu";

// Define a Zod schema for the car data
const carSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .string()
    .min(4, "Year must be a valid 4-digit year")
    .max(4, "Year must be a valid 4-digit year"),
  color: z.string().min(1, "Color is required"),
  dailyRate: z
    .string()
    .min(1, "Daily rate is required")
    .refine(
      (value) => (!isNaN(Number(value)) && (Number(value) > 0)),
      "Daily rate must be a  positive number"
    ),
});

function AddCarForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;

    try {
      if (!selectedFile) {
        alert("Please select a file");
        return;
      }

      try {
        const carData = { make, model, year, color, dailyRate };
        const validatedCarData = await carSchema.parseAsync(carData);

        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(
          "http://localhost:3000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data.result.secure_url);
        setImageLink(response.data.result.secure_url);
        alert("File uploaded successfully!");

        validatedCarData.image_url = response.data.result.secure_url;
        await addCar(validatedCarData);
        setError("Car added successfully");
        resetForm();
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError(error.issues[0].message);
        } else {
          setError(error.response.data.error);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const resetForm = () => {
    setMake("");
    setModel("");
    setYear("");
    setColor("");
    setDailyRate("");
    setImageLink("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {error && <div style={{
        fontWeight:"800",
        fontSize:"1.1rem",
      }}>{error}</div>} */}
      <div className="centralized">
        <div className="wrapper">
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Add Car</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Car Name"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Car Number"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
              <IoLogoModelS className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
              <MdOutlineAccessTimeFilled className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
              <MdInvertColors className="icon" />
            </div>
            <div className="input-box">
              <input
                type="number"
                placeholder="Daily Rate"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
                required
              />
              <BsCurrencyRupee className="icon" />
            </div>
            <div className="input-box">
              <UploadImage2
                imageLink={imageLink}
                setImageLink={setImageLink}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
              <LuFileInput className="icon" />
            </div>
            <button type="submit">Add Car</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCarForm;
