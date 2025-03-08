import React from "react";
import { useLocation } from "react-router-dom";

const DestinationDetailPage = () => {
  const location = useLocation();
  const { searchTerm, activities } = location.state || {}; // Handle undefined case

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Destination Details</h1>

      {searchTerm ? (
        <>
          <h2 className="text-primary">Location: {searchTerm}</h2>
          {activities && activities.length > 0 ? (
            <div className="mt-3">
              <h3>Popular Activities:</h3>
              <ul className="list-group">
                {activities.map((activity, index) => (
                  <li key={index} className="list-group-item">
                    <i className="bi bi-star-fill text-warning me-2"></i>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-muted">No activities available.</p>
          )}
        </>
      ) : (
        <p className="text-danger">No data available. Please search for a valid destination.</p>
      )}
    </div>
  );
};

export default DestinationDetailPage;
