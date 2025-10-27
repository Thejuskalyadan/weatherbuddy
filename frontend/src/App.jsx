import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./components/login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard"; // Dashboard component
import Vrishti from "./components/vrishti";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vrishti" element={<Vrishti />} />

        {/* 👇 Put this last to catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
