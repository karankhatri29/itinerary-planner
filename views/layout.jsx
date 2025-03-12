import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import BackgroundImage from "../src/components/BackgroundImage.jsx";
import "./style.css";


const Layout = ({ title = "Home" }) => {
  return (
    <>
      {/* React Helmet for Head Metadata */}
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - WanderSync Itinerary Planner</title>
      </Helmet>

      {/* Background Image Component */}
      <BackgroundImage />

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container">
    <Link className="navbar-brand" to="/">
      WanderSync
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
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <main className="main container-fluid mt-4 position-relative">
        <Outlet />
      </main>
    </div>


      {/* Footer */}
      <footer className="bg-dark text-white mt-4 py-4" style={{
    backgroundColor: "#333,",
    color: "white",
    textAlign: "center",
    width: "100%",
    position: "fixed",
    bottom: "0",
    left: "0",
    zIndex: "4"
}}>  <div className="container">
    
    <div className="row mt-1">
      <div className="col-12 text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} WanderSync Itinerary Planner. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</footer>

    </>
  );
};

export default Layout;
