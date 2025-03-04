import React from "react";

const ItineraryResult = ({ plan }) => {
  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Your {plan.location} Itinerary</h2>
            <button className="btn btn-light" onClick={() => window.print()}>
              Print Itinerary
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="itinerary-summary mb-4">
            <div className="row">
              <div className="col-md-6">
                <h4>Trip Summary</h4>
                <p>
                  <strong>Location:</strong> {plan.location}
                </p>
                <p>
                  <strong>Dates:</strong> {plan.startDate} to {plan.endDate}
                </p>
                <p>
                  <strong>Duration:</strong> {plan.duration} days
                </p>
                <p>
                  <strong>Travelers:</strong> {plan.travelers} {plan.travelers > 1 ? "people" : "person"}
                </p>
              </div>
              <div className="col-md-6">
                <h4>Budget Breakdown</h4>
                <p>
                  <strong>Total Budget:</strong> ₹{plan.budget.toLocaleString()}
                </p>
                {Object.entries(plan.budgetBreakdown).map(([key, value]) => (
                  <div className="progress mb-2" key={key}>
                    <div className="progress-bar bg-info" role="progressbar">
                      {key.charAt(0).toUpperCase() + key.slice(1)} (₹{value.toLocaleString()})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="mb-3">Your Day-by-Day Itinerary</h3>
          <div className="daily-itinerary">
            {plan.dailyItinerary.map((day, index) => (
              <div className="card mb-3" key={index}>
                <div className="card-header bg-info text-white">
                  <h4>Day {index + 1}: {day.date}</h4>
                </div>
                <div className="card-body">
                  {day.activities.map((activity, idx) => (
                    <div className="timeline-item" key={idx}>
                      <div className="timeline-time">{activity.time}</div>
                      <div className="timeline-content">
                        <h5>{activity.name}</h5>
                        <p>{activity.description}</p>
                        {activity.location && <p><strong>Location:</strong> {activity.location}</p>}
                        {activity.cost && <p><strong>Cost:</strong> ₹{activity.cost.toLocaleString()}</p>}
                        {activity.notes && <p><strong>Notes:</strong> {activity.notes}</p>}
                        {activity.category && <span className="badge bg-primary">{activity.category}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="actions d-flex justify-content-between">
            <a href="/" className="btn btn-secondary">Create New Plan</a>
            <button className="btn btn-primary" id="saveItinerary">Save Itinerary</button>
            <button className="btn btn-success" id="shareItinerary">Share Itinerary</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;