import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css"; // Assuming you have a CSS file for styling

function App() {
  return (
    <Router>
      {/* Header Section */}
      <header className="app-header">
        <h1>Wings Inventory Management System</h1>
        <p>Your one-stop solution for managing inventory efficiently and effectively.</p>
      </header>

      {/* Navigation Section */}
      <nav className="app-nav">
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/products">Product List</Link>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* Footer Section */}
      <footer className="app-footer">
        <p>
          <strong>Wings Inventory Management System</strong> © 2024. All rights
          reserved.
        </p>
        <p>
          Need any assistance? Contact us at{" "}
          <a href="mailto:support@wingsinventory.com">lithakong@wingsinventory.com</a>.
        </p>
        <p>Empowering businesses to manage their inventory with ease.</p>
      </footer>
    </Router>
  );
}

export default App;
