import React, { useState, useEffect } from "react";

const ItineraryResult = ({ plan, onUpdate, onDelete }) => {
  const [updatedPlan, setUpdatedPlan] = useState(plan);
  const [activityCost, setActivityCost] = useState(0);
  const [accommodationCost, setAccommodationCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  console.log(plan);
  useEffect(() => {
    setUpdatedPlan(plan);
    calculateCosts(plan);
  }, [plan]);

  if (!updatedPlan || Object.keys(updatedPlan).length === 0) return null;

  const calculateCosts = (updatedPlan) => {
    if (!updatedPlan) return;
    const travelers = updatedPlan.travelers || 1;

    // Sum of all activity costs across all days
    const newActivityCost = updatedPlan.dailyItinerary
      ? updatedPlan.dailyItinerary.reduce(
        (sum, day) =>
          sum +
          (day.activities
            ? day.activities.reduce((aSum, act) => aSum + (act.cost || 0), 0)
            : 0),
        0
      )
      : 0;

    // Sum of all accommodation costs across the trip
    const newAccommodationCost = updatedPlan.transportOptions?.length
      ? updatedPlan.transportOptions.reduce((sum, acc) => sum + (acc.cost || 0), 0)
      : 0;

    // Total cost calculation (accommodation cost shouldn't be multiplied by travelers unless per person)
    const newTotalCost = newActivityCost + ((newAccommodationCost) * travelers);

    setActivityCost(newActivityCost);
    setAccommodationCost(newAccommodationCost);
    setTotalCost(newTotalCost);
  };

  // Recalculate costs whenever `updatedPlan` changes
  useEffect(() => {
    calculateCosts(updatedPlan);
  }, [updatedPlan]);

  const handleDeleteTransport = (transportIndex) => {
    const newPlan = { ...updatedPlan };
    newPlan.transportOptions.splice(transportIndex, 1);
    calculateCosts(newPlan);
    setUpdatedPlan(newPlan);
    onUpdate(newPlan);
  };



  const handleDeleteActivity = (dayIndex, activityIndex) => {
    const newPlan = { ...updatedPlan };
    newPlan.dailyItinerary[dayIndex].activities.splice(activityIndex, 1);
    calculateCosts(newPlan);
    setUpdatedPlan(newPlan);
    onUpdate(newPlan);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("itinerary-print")?.cloneNode(true);
  
    if (printContent) {
      // Remove delete buttons from the print version
      const buttons = printContent.querySelectorAll("button");
      buttons.forEach((btn) => btn.remove());
  
      // Extract data from the div
      const location = updatedPlan.location || "Not specified";
      const startDate = updatedPlan.startDate || "N/A";
      const endDate = updatedPlan.endDate || "N/A";
      const duration = updatedPlan.duration ? `${updatedPlan.duration} days` : "N/A";
      const travelers = updatedPlan.travelers || "N/A";
      const transportOptions = updatedPlan.transportOptions || [];
      const dailyItinerary = updatedPlan.dailyItinerary || [];
      const newActivityCost = updatedPlan.dailyItinerary
      ? updatedPlan.dailyItinerary.reduce(
        (sum, day) =>
          sum +
          (day.activities
            ? day.activities.reduce((aSum, act) => aSum + (act.cost || 0), 0)
            : 0),
        0
      )
      : 0;
      const newAccommodationCost = updatedPlan.transportOptions?.length
      ? updatedPlan.transportOptions.reduce((sum, acc) => sum + (acc.cost || 0), 0)
      : 0;
      const newTotalCost = newActivityCost + ((newAccommodationCost * travelers));

  
      // Open new window for printing
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <html>
          <head>
            <title>Travel Itinerary - WanderSync</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
              body {
                font-family: 'Poppins', sans-serif;
                margin: 20px;
                padding: 20px;
                background-color: #f4f4f9;
                color: #333;
                line-height: 1.6;
              }
              .header {
                text-align: center;
                padding-bottom: 15px;
                border-bottom: 3px solid #004080;
              }
              .header h1 {
                color: #004080;
              }
              .trip-summary {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
                margin-top: 20px;
              }
              h2 {
                color: #004080;
                border-bottom: 2px solid #004080;
                padding-bottom: 5px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
              }
              th, td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: center;
              }
              th {
                background-color: #004080;
                color: white;
              }
              .cost-breakdown {
                background: #e3f2fd;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 14px;
                color: #666;
              }
              .footer a {
                color: #004080;
                text-decoration: none;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>WanderSync Itinerary</h1>
              <p>Your Personalized Travel Plan</p>
            </div>
  
            <div class="trip-summary">
              <h2>Trip Summary</h2>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Dates:</strong> ${startDate} to ${endDate}</p>
              <p><strong>Duration:</strong> ${duration}</p>
              <p><strong>Travelers:</strong> ${travelers}</p>
              
              ${
                transportOptions.length > 0
                  ? `<h2>Transport Options</h2>
                     <ul>${transportOptions
                       .map(
                         (transport) =>
                           `<li><strong>${transport.type}:</strong> ₹${transport.cost.toLocaleString()} per person</li>`
                       )
                       .join("")}</ul>`
                  : ""
              }
  
              ${
                dailyItinerary.length > 0
                  ? `<h2>Day-by-Day Itinerary</h2>
                    ${dailyItinerary
                      .map(
                        (day, dayIndex) => `
                      <div>
                        <h3>Day ${dayIndex + 1}: ${day.date || `Day ${dayIndex + 1}`}</h3>
                        ${
                          day.activities.length > 0
                            ? `<table>
                                <tr>
                                  <th>Activity</th>
                                  <th>Description</th>
                                  <th>Cost (₹)</th>
                                </tr>
                                ${day.activities
                                  .map(
                                    (activity) => `
                                  <tr>
                                    <td>${activity.name || "Unnamed Activity"}</td>
                                    <td>${activity.description || "No description available"}</td>
                                    <td>${activity.cost ? activity.cost.toLocaleString() : "-"}</td>
                                  </tr>
                                `
                                  )
                                  .join("")}
                              </table>`
                            : "<p>No activities planned for this day.</p>"
                        }
                      </div>
                    `
                      )
                      .join("")}`
                  : ""
              }
  
              <div class="cost-breakdown">
                <h2>Cost Breakdown</h2>
                <p><strong>Activity Cost:</strong> ₹${newActivityCost}</p>
                <p><strong>Traveling Cost:</strong> ₹${newAccommodationCost} per person</p>
                <h3>Total Estimated Cost: ₹${newTotalCost}</h3>
              </div>
            </div>
  
            <div class="footer">
              <p>© 2025 WanderSync. All rights reserved.</p>
              <p>Contact: <a href="mailto:support@wandersync.com">support@wandersync.com</a> | +91 98765 43210</p>
              <p>Website: <a href="https://www.wandersync.com">www.wandersync.com</a></p>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
      newWindow.print();
    }
  };
  
  
  
  

  return (
    <div className="container-fluid p-2">
      <div className="card shadow-lg p-4 rounded-4 border-0">
        <div className="card-header bg-gradient text-white rounded-top-4 p-3" style={{ background: "linear-gradient(135deg, #007bff, #0056b3)" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Your {updatedPlan.location || "Trip"} Itinerary</h2>
            <button className="btn btn-light fw-bold shadow-sm" onClick={handlePrint}>Print Itinerary</button>
          </div>
        </div>

        <div className="card-body p-4" id="itinerary-print">
          <h4 className="fw-bold text-primary">Trip Summary</h4>
          <p><strong>📍 Location:</strong> {updatedPlan.location || "Not specified"}</p>
          <p><strong>📅 Dates:</strong> {updatedPlan.startDate || "N/A"} to {updatedPlan.endDate || "N/A"}</p>
          <p><strong>🕒 Duration:</strong> {updatedPlan.duration ? `${updatedPlan.duration} days` : "N/A"}</p>
          <p><strong>👥 Travelers:</strong> {updatedPlan.travelers || "N/A"}</p>

          {/* Transport Options */}
          {updatedPlan.transportOptions?.length > 0 && (
            <div className="mt-3">
              <h4 className="fw-bold text-primary">🚗 Transport Options</h4>
              <ul className="list-group">
                {updatedPlan.transportOptions.map((transport, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center border-0">
                    <span><strong>{transport.type}:</strong> ₹{transport.cost.toLocaleString()} per person</span>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteTransport(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Day-by-Day Itinerary */}
          {updatedPlan.dailyItinerary?.length > 0 && (
            <div className="mt-4">
              <h3 className="fw-bold text-primary">📅 Your Day-by-Day Itinerary</h3>
              {updatedPlan.dailyItinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="card-danger shadow-sm my-3 border-0 rounded-3">
                  <div className="card-header bg-info text-white rounded-top-3">
                    <h4 className="mb-0">Day {dayIndex + 1}: {day.date || `Day ${dayIndex + 1}`}</h4>
                  </div>
                  <div className="card-body">
                    {day.activities?.length > 0 ? (
                      day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="d-flex justify-content-between align-items-center border-bottom py-2">
                          <div>
                            <h5 className="mb-1">{activity.name || "Unnamed Activity"}</h5>
                            <p className="mb-0 text-muted">{activity.description || "No description available"}</p>
                            {activity.cost !== undefined && (
                              <p className="text-success"><strong>Cost:</strong> ₹{activity.cost.toLocaleString()}</p>
                            )}
                          </div>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteActivity(dayIndex, activityIndex)}>Delete</button>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No activities planned for this day.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cost Breakdown */}
          <div className="alert alert-secondary mt-4 rounded-3 shadow-sm">
            <h4 className="fw-bold text-dark">💰 Cost Breakdown</h4>
            <p><strong>🎭 Activity Cost:</strong> ₹{activityCost.toLocaleString()}</p>
            <p><strong>🚕 Travelling Cost:</strong> ₹{accommodationCost.toLocaleString()} per person</p>
            <h4 className="text-primary fw-bold"> Total Estimated Cost: ₹{totalCost.toLocaleString()}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;

