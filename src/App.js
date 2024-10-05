import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";

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
