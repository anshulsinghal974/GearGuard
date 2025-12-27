import React, { useState } from "react";
import { signup } from "../api/auth"; // Make sure path is correct!
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent page reload
    if (!email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const data = await signup(email, password, role);
      console.log("Signup response:", data); // ✅ debug

      alert(data.message);

      if (data.message === "Signup successful") {
        navigate("/login"); // redirect to login
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="">Select Role</option>
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
}

try {
  console.log("Sending signup request to:", BASE_URL + "/signup");
  const data = await signup(email, password, role);
  console.log("Response:", data);
} catch (err) {
  console.error("Signup error:", err);
  alert("Error connecting to server");
}

