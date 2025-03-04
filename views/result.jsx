import React from "react";

const ItineraryResult = ({ plan, }) => {
  console.log(plan);
  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Your {plan.location || "Trip"} Itinerary</h2>
            <button className="btn btn-light" onClick={() => window.print()}>
              Print Itinerary
            </button>
          </div>
        </div>
        <div className="card-body">
          <h4>Trip Summary</h4>
          <p><strong>Location:</strong> {plan.location || "Not specified"}</p>
          <p><strong>Dates:</strong> {plan.startDate || "N/A"} to {plan.endDate || "N/A"}</p>
          <p><strong>Duration:</strong> {plan.duration ? `${plan.duration} days` : "N/A"}</p>
          <p><strong>Travelers:</strong> {plan.travelers || "N/A"}</p>

          {plan.budgetBreakdown && (
            <>
              <h4>Budget Breakdown</h4>
              {Object.entries(plan.budgetBreakdown).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ₹
                  {value ? value.toLocaleString() : "0"}
                </p>
              ))}
            </>
          )}

          {plan.dailyItinerary && plan.dailyItinerary.length > 0 ? (
            <>
              <h3>Your Day-by-Day Itinerary</h3>
              {plan.dailyItinerary.map((day, index) => (
                <div className="card mb-3" key={index}>
                  <div className="card-header bg-info text-white">
                    <h4>Day {index + 1}: {day.date || `Day ${index + 1}`}</h4>
                  </div>
                  <div className="card-body">
                    {day.activities && day.activities.length > 0 ? (
                      day.activities.map((activity, idx) => (
                        <div key={idx}>
                          <h5>{activity.name || "Unnamed Activity"}</h5>
                          <p>{activity.description || "No description available"}</p>
                          {activity.cost !== undefined && (
                            <p><strong>Cost:</strong> ₹{activity.cost.toLocaleString()}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No activities planned for this day.</p>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No itinerary details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;
