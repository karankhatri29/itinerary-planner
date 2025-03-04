import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ title, children }) => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - Tamil Nadu Itinerary Planner</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <a className="navbar-brand" href="/">
              Tamil Nadu Itinerary Planner
            </a>
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
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/destinations">
                    Destinations
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>{children}</main>

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
                    <a href="/" className="text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/destinations" className="text-white">
                      Destinations
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-white">
                      Contact
                    </a>
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

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </>
  );
};

export default Layout;