const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/auth";

export const signup = async (email, password, role) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });
  return res.json();
};

export const login = async (email, password, role) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });
  return res.json();
};

export const forgotPassword = async (email) => {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  return res.json();
};
