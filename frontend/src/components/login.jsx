import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    if (getCookie("loginUserId")) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });
      const data = await res.json();
      if (res.ok) {
        document.cookie = `loginUserId=${userId}; path=/; max-age=${7 * 24 * 60 * 60}`;
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch (error) {
      alert("Connection error. Is the server running?");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif font-bold text-white drop-shadow-md">Vrishti</h1>
          <p className="text-white/80 mt-2 font-medium">Your Personal Weather Insights</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
          
          <div className="space-y-4">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:opacity-100 transition-opacity">📧</span>
              <input
                type="text"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50 transition-all"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:opacity-100 transition-opacity">🔒</span>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg hover:bg-opacity-90 transition-all"
          >
            Sign In
          </motion.button>

          <p className="text-center text-white/70 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-white font-bold hover:underline">Register Here</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;