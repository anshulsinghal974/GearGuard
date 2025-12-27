import React, { useState } from "react";
import { forgotPassword } from "../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await forgotPassword(email);
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <button type="submit">Send Reset Link</button>
      <p><a href="/login">Login</a> | <a href="/signup">Signup</a></p>
    </form>
  );
}
