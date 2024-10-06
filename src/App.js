import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import UserDetails from "./components/UserDetails/UserDetails";
import "./App.css";

// Main Application Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home component for listing users */}
        <Route path="/user/:id" element={<UserDetails />} /> {/* User details component */}
      </Routes>
    </Router>
  );
}

export default App;
