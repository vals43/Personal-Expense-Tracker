import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/Protected";
import Signup from "./pages/Signup";
import Logine from "./pages/Logine";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected><Profile /></Protected>} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path="/logine" element={<Logine />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/logine" />} />
      </Routes>
    </BrowserRouter>
  );
}
