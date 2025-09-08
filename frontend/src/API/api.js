const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    let msg = res.statusText;
    try { const body = await res.json(); if (body.message) msg = body.message; } catch {}
    throw new Error(msg);
  }
  return res.json();
}
