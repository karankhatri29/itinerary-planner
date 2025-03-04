import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const DestinationsPage = ({ destinations = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("all");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    //logic
  };

  const handleFilter = (category) => {
    setFilteredCategory(category);
  };

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filteredCategory === "all" || destination.categories.includes(filteredCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Popular Destinations in Tamil Nadu</h1>

      {/* Search Input */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-primary" type="button">Search</button>
          </div>
        </div>
      </div>

      {/* Destination Cards */}
      <div className="row">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <div key={destination.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-img-container">
                  <img
                    src={destination.imageUrl || "https://via.placeholder.com/300"}
                    className="card-img-top"
                    alt={destination.name}
                  />
                  <div className="location-badge">
                    <span className="badge bg-primary">{destination.name}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{destination.name}</h5>
                  <p className="card-text">{destination.description}</p>
                  <div className="mb-2">
                    {destination.categories.map((category, index) => (
                      <span key={index} className="badge bg-secondary me-1">{category}</span>
                    ))}
                  </div>
                  <div className="mt-2">
                    <strong>Known For:</strong>
                    <ul className="list-unstyled">
                      {destination.knownFor.slice(0, 3).map((item, index) => (
                        <li key={index}>
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-white">
                  <button className="btn btn-outline-primary w-100" onClick={() => navigate(`/destinations/${destination.id}`)}>
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No destinations found.</p>
        )}
      </div>

      {/* Filter by Experience */}
      <div className="row my-4">
        <div className="col-12">
          <h3>Filter by Experience</h3>
          <div className="category-filters d-flex flex-wrap">
            {["all", "adventure", "cultural", "heritage", "food", "relaxation", "luxury", "nature", "beach", "spiritual"].map((category) => (
              <button
                key={category}
                className={`btn m-1 ${filteredCategory === category ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Your Trip Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Plan Your Trip to Tamil Nadu</h4>
            </div>
            <div className="card-body">
              <p>Ready to explore the wonders of Tamil Nadu? Create a personalized itinerary that fits your interests and budget.</p>
              <button className="btn btn-primary" onClick={() => navigate("/form")}>
                Create Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    <Outlet />
    </div>
  );
};

export default DestinationsPage;
