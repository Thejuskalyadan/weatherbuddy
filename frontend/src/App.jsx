import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Login from "./components/login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard";
import Vrishti from "./components/vrishti";

export default function App() {
  return (
    <Router>
      <div className="antialiased text-slate-900">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vrishti" element={<Vrishti />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}