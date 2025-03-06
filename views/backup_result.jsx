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
      const newTotalCost = newActivityCost + ((newAccommodationCost) * travelers);

  
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
                           `<li><strong>${transport.type}:</strong> ₹${transport.cost.toLocaleString()}</li>`
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
                <p><strong>Traveling Cost:</strong> ₹${newAccommodationCost}</p>
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
    <div className="container mt-4 mb-5">
       <div className="card shadow">
         <div className="card-header bg-primary text-white">
           <div className="d-flex justify-content-between align-items-center">
             <h2>Your {updatedPlan.location || "Trip"} Itinerary</h2>
             <div>
                <button className="btn btn-light mx-2" onClick={handlePrint}>
                 Print Itinerary
               </button>
             </div>
           </div>
         </div>
        <div className="card-body" id="itinerary-print">
          <h4>Trip Summary</h4>
          <p><strong>Location:</strong> {updatedPlan.location || "Not specified"}</p>
          <p><strong>Dates:</strong> {updatedPlan.startDate || "N/A"} to {updatedPlan.endDate || "N/A"}</p>
          <p><strong>Duration:</strong> {updatedPlan.duration ? `${updatedPlan.duration} days` : "N/A"}</p>
          <p><strong>Travelers:</strong> {updatedPlan.travelers || "N/A"}</p>
          {/* Transport Options Display */}
          {updatedPlan.transportOptions?.length > 0 && (
            <>
              <h4>Transport Options</h4>
              {updatedPlan.transportOptions.map((transport, index) => (
                <li key={index}>
                  <strong>{transport.type}:</strong> ₹{transport.cost.toLocaleString()}
                  <button className="btn btn-danger btn-sm ms-2 m-1" onClick={() => handleDeleteTransport(index)}>
                    Delete
                  </button>

                </li>
              ))}
            </>
          )}

          {updatedPlan.dailyItinerary?.length > 0 && (
            <>
              <h3 className="mt-4">Your Day-by-Day Itinerary</h3>
              {updatedPlan.dailyItinerary.map((day, dayIndex) => (
                <div className="card mb-3" key={dayIndex}>
                  <div className="card-header bg-info text-white">
                    <h4>Day {dayIndex + 1}: {day.date || `Day ${dayIndex + 1}`}</h4>
                  </div>
                  <div className="card-body">
                    {day.activities?.length > 0 ? (
                      day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="d-flex justify-content-between">
                          <div>
                            <h5>{activity.name || "Unnamed Activity"}</h5>
                            <p>{activity.description || "No description available"}</p>
                            {activity.cost !== undefined && (
                              <p><strong>Cost:</strong> ₹{activity.cost.toLocaleString()}</p>
                            )}
                          </div>
                          <button
                            className="btn btn-sm btn-danger m-4 mt-3 mb-5"
                            onClick={() => handleDeleteActivity(dayIndex, activityIndex)}
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No activities planned for this day.</p>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Cost Breakdown */}
          <div className="alert alert-secondary mt-4">
            <h4>Cost Breakdown</h4>
            <p><strong>Activity Cost:</strong> ₹{activityCost.toLocaleString()}</p>
            <p><strong>Travelling Cost:</strong> ₹{accommodationCost.toLocaleString()}</p>
            <h4>Total Estimated Cost: ₹{totalCost.toLocaleString()}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;

