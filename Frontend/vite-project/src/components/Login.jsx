import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password, role);
    alert(data.message);

    if (data.message === "Login successful") {
      // Redirect based on role
      if (role === "customer") navigate("/customer-dashboard");
      else if (role === "technician") navigate("/technician-dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <select value={role} onChange={e => setRole(e.target.value)} required>
        <option value="">Select Role</option>
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
}
