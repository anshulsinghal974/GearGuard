import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import CustomerDashboard from "./components/CustomerDashboard";
import TechnicianDashboard from "./components/TechnicianDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/technician-dashboard" element={<TechnicianDashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
