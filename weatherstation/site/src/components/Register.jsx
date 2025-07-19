import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMapPin,
} from "react-icons/fa";

const Register = () => {
  const [location, setLocation] = useState({ lat: "", lon: "" });
  const [formData, setFormData] = useState({
    userName: "",
    schoolEmail: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      ...formData,
      lat: location.lat,
      lon: location.lon,
    };
    console.log(payload);
    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful ✅");
        navigate("/");
      } else {
        alert(data.message || "Registration failed ❌");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 left-8 text-3xl font-serif text-white drop-shadow-lg"
      >
        WEATHER BUDDY
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        {/* User Name */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white shadow-sm">
          <FaUser className="text-gray-500 mr-3" />
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            required
            onChange={handleChange}
            className="flex-1 outline-none bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white shadow-sm">
          <FaEnvelope className="text-gray-500 mr-3" />
          <input
            type="email"
            name="schoolEmail"
            placeholder="Email (User ID)"
            required
            onChange={handleChange}
            className="flex-1 outline-none bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Phone Number */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white shadow-sm">
          <FaPhone className="text-gray-500 mr-3" />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="flex-1 outline-none bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Address */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white shadow-sm">
          <FaMapMarkerAlt className="text-gray-500 mr-3" />
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
            className="flex-1 outline-none bg-transparent placeholder-gray-400"
          />
        </div>



        {/* Password */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white shadow-sm">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="flex-1 outline-none bg-transparent placeholder-gray-400"
          />
          <span
            className="text-gray-500 cursor-pointer ml-2"
            onClick={togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-6 bg-white shadow-sm">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            className="flex-1 outline-none bg-transparent placeholder-gray-400"
          />
          <span
            className="text-gray-500 cursor-pointer ml-2"
            onClick={toggleConfirmPassword}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>

        {/* Back to Login */}
        <p className="mt-4 text-center text-sm text-gray-700">
          <Link to="/" className="text-blue-700 font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
