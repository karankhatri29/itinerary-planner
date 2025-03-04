import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

const Layout = ({ title = "Home" }) => {
  return (
    <>
      {/* React Helmet for Head Metadata */}
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - Tamil Nadu Itinerary Planner</title>
      </Helmet>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Tamil Nadu Itinerary Planner
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/destinations">
                  Destinations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content - Outlet for Child Routes */}
      <main className="container mt-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Tamil Nadu Itinerary Planner</h5>
              <p>
                Your perfect travel companion for exploring the beauty and
                culture of Tamil Nadu.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/destinations" className="text-white">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Connect With Us</h5>
              <div className="social-icons">
                <a href="#" className="text-white me-2">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white me-2">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white me-2">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} Tamil Nadu Itinerary Planner. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;

