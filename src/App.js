import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import CreateUserForm from "./components/CreateUserForm";
import "./App.css";

// Main Application Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home component for listing users */}
        <Route path="/user/:id" element={<UserDetails />} /> {/* User details component */}
        <Route path="/create" element={<CreateUserForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
