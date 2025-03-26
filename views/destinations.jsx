import React, { useState, useEffect } from "react";
import jsonData from "../public/data/locations.json";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("all");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const navigate = useNavigate();

  const categories = ["adventure", "luxury", "nature", "cultural", "relaxation", "food"];

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    console.log("Search Query:", query);
    setSearchTerm(query);

    const locationData = jsonData.find(
      (location) => location.name.toLowerCase() === query
    );

    console.log("Location Data:", locationData);

    if (locationData) {
      const allActivities = categories.flatMap(
        (category) => locationData[category] || []
      );

      console.log("All Activities Found:", allActivities);
      setFilteredActivities(allActivities);
    }
  };
  const handleFilter = (category) => {
    console.log("Selected Category:", category);
    setFilteredCategory(category);

    if (!searchTerm) {
      console.log("No location selected. Please search for a location first.");
      return; // Prevent filtering when no location is selected
    }

    const locationData = jsonData.find(
      (location) => location.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (locationData) {
      if (category === "all") {
        // Show all activities for the searched location
        const allActivities = categories.flatMap(
          (cat) => locationData[cat] || []
        );
        setFilteredActivities(allActivities);
      } else {
        // Show only activities of the selected category within the searched location
        setFilteredActivities(locationData[category] || []);
      }
    }
  };


  console.log("Filtered Activities:", filteredActivities);

  return (
    <div className="container-fluid mt-5" >
      <h1 className="mb-4 text-white">Popular Destinations in India</h1>

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
            <button className="btn btn-outline-dark bg-dark text-white" type="button">Search</button>
          </div>
        </div>
      </div>

      {/* Filter by Experience */}
      <div className="row my-4 text-white">
        <div className="col-12">
          <h3>Filter by Experience</h3>
          <div className="category-filters d-flex flex-wrap text-dark ">
            {["all", "adventure", "cultural", "food", "relaxation", "luxury", "nature"].map((category) => (
              <button
                key={category}
                className={`btn m-1 ${filteredCategory === category ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => handleFilter(category)}
                style={{ backgroundColor: "white", color: "black" }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destination Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((destination, destIndex) => (
            <div key={destIndex} className="col">
              <div className="card h-100 shadow-sm border-0 p-3">
                {/* Destination Image (Optional, if available) */}
                {destination.image && (
                  <img src={destination.image} className="card-img-top" alt={destination.name} style={{ height: "180px", objectFit: "cover" }} />
                )}

                {/* Card Body */}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{destination.name}</h5>
                    <span className="badge bg-primary">{destination.rating}</span>
                  </div>
                  <p className="text-muted small">{destination.description}</p>
                </div>

                {/* Card Footer */}
                <div className="card-footer bg-white border-0">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => window.open(destination.url, "_blank")}
                  >
                    Explore
                  </button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No destinations found.</p>

        )}
      </div>




      {/* Plan Your Trip Section */}
      <div className="row mb-5 mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Plan Your Trip to India</h4>
            </div>
            <div className="card-body text-dark">
              <p>Ready to explore the wonders of Tamil Nadu? Create a personalized itinerary that fits your interests and budget.</p>
              <button className="btn btn-outline-dark" onClick={() => navigate("/form")}>
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
