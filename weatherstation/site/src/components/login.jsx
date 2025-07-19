import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Helper function to get cookie by name
  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  React.useEffect(() => {
    const loginUserId = getCookie("loginUserId");
    if (loginUserId) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();
      console.log(data)

      if (res.ok) {
        // Set login cookie to persist login state for 7 days
        document.cookie = "loginUserId=" + userId + "; path=/; max-age=" + (7 * 24 * 60 * 60);
        ("Login successful ✅");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch (error) {
      console.error("Login error ❌:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 left-8 text-3xl font-serif text-white drop-shadow-lg"
      >
        WEATHER BUDDY
      </motion.h1>

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Login
        </h2>

        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-4 transition-all duration-200 focus-within:border-blue-500">
          <span className="text-gray-500 mr-3">🔑</span>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="outline-none flex-1 bg-transparent placeholder-gray-400"
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-6 transition-all duration-200 focus-within:border-blue-500">
          <span className="text-gray-500 mr-3">🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="outline-none flex-1 bg-transparent placeholder-gray-400"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </motion.button>

        <div className="text-center mt-4 text-sm text-gray-600">
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Register Here
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
