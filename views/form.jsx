// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ItineraryResult from "./result";

// const getFilteredActivities = (userInput, experiences) => { 
//     const locationData = experiences.find(exp => exp.name === userInput.location);
//     console.log("user input:",userInput);
//     console.log("data:",experiences);
//     if (!locationData) {
//         console.log("Location not found!");
//         return [];
//     }

//     let selectedActivities = [];
//     console.log("user Preferences:",userInput.preferences); 
//     userInput.preferences.forEach(pref => {
//         if (locationData[pref]) {
//             selectedActivities.push(...locationData[pref]);
//         }
//     });

//     return selectedActivities;
// };

// const ItineraryForm = () => {
//     const [formData, setFormData] = useState({
//         startDate: "",
//         endDate: "",
//         location: "",
//         budget: "",
//         travelers: 1,
//         preferences: [],
//         accommodation: "budget",
//         transport: "public"
//     });

//     const [experiences, setExperiences] = useState([]);
//     const [filteredExperiences, setFilteredExperiences] = useState([]);
//     const [itinerary, setItinerary] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchExperiences = async () => {
//             try {
//                 const response = await fetch("/data/locations.json");
//                 if (!response.ok) throw new Error("Failed to fetch experiences");

//                 const data = await response.json();
//                 setExperiences(data);
//             } catch (error) {
//                 console.error("Error loading experiences:", error);
//             }
//         };

//         fetchExperiences();
//     }, []);

//     useEffect(() => {
//         if (formData.location) {
//             const filtered = getFilteredActivities(formData, experiences).map(activity => ({
//                 name: activity.name,
//                 description: activity.description,
//                 cost: activity.cost,
//                 duration: activity.duration,
//                 rating: activity.rating,
//                 bestTime: activity.bestTime,
//                 includesMeal: activity.includesMeal
//             }));
//             setFilteredExperiences(filtered);
//             console.log("Updated Filtered Experiences:", filtered);
//         }
//     }, [formData.location, formData.preferences, experiences]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: type === "checkbox" 
//                 ? checked 
//                     ? [...prev.preferences, value] 
//                     : prev.preferences.filter(pref => pref !== value)
//                 : value
//         }));
//     };

//     const validateForm = () => {
//         const { startDate, endDate, budget } = formData;
//         if (!startDate || !endDate) return "Please select valid start and end dates.";
//         if (new Date(startDate) > new Date(endDate)) return "End date must be after the start date.";
//         if (parseInt(budget) < 1000) return "Budget should be at least ₹1000.";
//         return "";
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const validationError = validateForm();
//         if (validationError) {
//             setError(validationError);
//             return;
//         }
//         setError("");
//         generateItinerary();
//     };

//     const generateItinerary = () => {
//         let { budget, startDate, endDate } = formData;
//         let itineraryPlan = [];
//         let totalBudget = parseInt(budget);
//         let start = new Date(startDate);
//         let end = new Date(endDate);
//         console.log("this is the data recieved in generate function:",filteredExperiences);
//         while (start <= end && totalBudget > 0) {
//             const dayPlan = [];
//             if (filteredExperiences.length === 0) {
//                 console.warn("No experiences available");
//                 break;
//             }

//             filteredExperiences.sort((a, b) => a.cost - b.cost);
//             console.log("Sorted filetered experience",filteredExperiences);
//             for (let exp of filteredExperiences) {
//                 console.log("experience:",exp);
//                 if (totalBudget >= exp.cost) {
//                     dayPlan.push({ name: exp.name, description: exp.description, cost: exp.cost });
//                     totalBudget -= exp.cost;
//                 }
//             }

//             if (dayPlan.length > 0) {
//                 console.log("Day Plan:",dayPlan);
//                 itineraryPlan.push({ date: start.toDateString(), activities: dayPlan });
//             } else {
//                 console.warn("No activities found for that day");
//             }

//             start.setDate(start.getDate() + 1);
//         }
//         console.log(itineraryPlan);

//         const structuredPlan = {
//             location: formData.location,
//             startDate,
//             endDate,
//             duration: itineraryPlan.length,
//             travelers: formData.travelers,
//             budgetBreakdown: {
//                 Accommodation: Math.floor(parseInt(budget) * 0.4),
//                 Transport: Math.floor(parseInt(budget) * 0.2),
//                 Activities: parseInt(budget) - (Math.floor(parseInt(budget) * 0.6))
//             },
//             dailyItinerary: itineraryPlan
//         };

//         setItinerary(structuredPlan);
//         console.log("Structured Plan Created:",structuredPlan);
//         console.log("Itinerary:",itinerary);
//     };
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ItineraryResult from "./result";

const getFilteredActivities = (userInput, experiences, allocatedActivityBudget) => {
    const locationData = experiences.find(exp => exp.name === userInput.location);
    if (!locationData) return [];

    let selectedActivities = [];

    if (userInput.preferences.includes("Business")) {
        return locationData["Business"] || [];
    }

    userInput.preferences.forEach(pref => {
        if (locationData[pref]) {
            selectedActivities.push(...locationData[pref]);
        }
    });

    selectedActivities = selectedActivities.filter(activity => activity.cost * userInput.travelers <= allocatedActivityBudget);
    return selectedActivities;
};




const ItineraryForm = () => {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        location: "",
        budget: "",
        travelers: "",
        preferences: [],
        accommodation: "budget",
        transport: "public"
    });

    const [experiences, setExperiences] = useState([]);
    const [filteredExperiences, setFilteredExperiences] = useState([]);
    const [itinerary, setItinerary] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch("/data/locations.json");
                if (!response.ok) throw new Error("Failed to fetch experiences");

                const data = await response.json();
                setExperiences(data);
            } catch (error) {
                console.error("Error loading experiences:", error);
            }
        };

        fetchExperiences();
    }, []);

    useEffect(() => {
        if (formData.location) {
            const totalBudget = parseInt(formData.budget);
            const accommodationBudget = Math.floor(totalBudget * 0.4);
            const transportBudget = Math.floor(totalBudget * 0.2);
            const activityBudget = totalBudget - (accommodationBudget + transportBudget);

            const filtered = getFilteredActivities(formData, experiences, activityBudget).map(activity => ({
                ...activity,
                cost: activity.cost * formData.travelers,
            }));

            setFilteredExperiences(filtered);
        }
    }, [formData, experiences]);

    const handleSubmit = (e) => {
        e.preventDefault();
        generateItinerary();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" && name === "preferences" 
                ? checked 
                    ? [...prev.preferences, value]  // Add selected preference
                    : prev.preferences.filter(pref => pref !== value)  // Remove unselected preference
                : value
        }));
    };

    const generateItinerary = () => {
        let { budget, startDate, endDate, travelers } = formData;
        let totalBudget = parseInt(budget);
        let start = new Date(startDate);
        let end = new Date(endDate);
        let numDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        let budgetBreakdown = {
            Accommodation: Math.floor(totalBudget * 0.4),
            Transport: Math.floor(totalBudget * 0.2),
            Activities: totalBudget - Math.floor(totalBudget * 0.6),
        };

        let itineraryPlan = [];
        let activitiesPerDay = numDays === 1 ? 1 : numDays === 2 ? 2 : filteredExperiences.length;
        let selectedActivities = filteredExperiences.slice(0, activitiesPerDay * formData.preferences.length);

        for (let i = 0; i < numDays; i++) {
            itineraryPlan.push({
                date: new Date(start.getTime() + i * 86400000).toDateString(),
                activities: selectedActivities.filter((_, index) => index % numDays === i) // Evenly distribute activities
            });
        }
        

        setItinerary({
            location: formData.location,
            startDate,
            endDate,
            duration: numDays,
            travelers,
            budgetBreakdown,
            dailyItinerary: itineraryPlan,
            transportOptions: getTransportOptions(budgetBreakdown.Transport)
        });
        console.log("Itenary:",itinerary);
    };

    const getTransportOptions = (transportBudget) => {
        return [
            { type: "Flight", cost: transportBudget * 0.5 },
            { type: "Train", cost: transportBudget * 0.3 },
            { type: "City Transport", cost: transportBudget * 0.2 }
        ];
    };



    return (
        <div className="container-fluid py-5" style={{backgroundImage: "url('/api/placeholder/1500/800')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed"}}>
  <div className="row justify-content-center">
    <div className="col-lg-10">
      <div className="card border-0 shadow-lg rounded-lg overflow-hidden bg-white bg-opacity-95">
        <div className="card-header bg-primary text-white p-4 position-relative">
          <div className="d-flex align-items-center justify-content-center">
            <img src="/api/placeholder/40/40" alt="Tamil Nadu logo" className="me-3" style={{borderRadius: "50%"}} />
            <h2 className="mb-0 fw-bold">Tamil Nadu Itinerary Planner</h2>
          </div>
        </div>
        
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div>{error}</div>
            </div>
          )}
          
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-info-circle-fill text-primary fs-4 me-3"></i>
                    <p className="mb-0">Experience the rich culture, stunning landscapes, and delicious cuisine of Tamil Nadu. Plan your perfect trip now!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Trip Duration Card */}
              <div className="col-md-12">
                <div className="card border-0 shadow-sm h-100 overflow-hidden">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <div style={{height: "100%", backgroundImage: "url('/api/placeholder/400/320')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title mb-3">
                          <i className="bi bi-calendar-event me-2 text-primary"></i>
                          Trip Duration
                        </h5>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label fw-semibold">Start Date:</label>
                            <input 
                              type="date" 
                              className="form-control form-control-lg" 
                              name="startDate" 
                              value={formData.startDate} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-semibold">End Date:</label>
                            <input 
                              type="date" 
                              className="form-control form-control-lg" 
                              name="endDate" 
                              value={formData.endDate} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Destination Card */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100 destination-card">
                  <div className="position-relative">
                    <div style={{height: "150px", backgroundImage: "url('/api/placeholder/400/320')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary rounded-pill">Top Destinations</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mb-3">
                      <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                      Choose Your Destination
                    </h5>
                    <label className="form-label fw-semibold">Select Location:</label>
                    <select 
                      className="form-select form-select-lg"
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="" disabled>Choose a location</option>
                      {["Chennai", "Vellore", "Pondicherry", "Mahabalipuram", "Ooty", "Kodaikanal", "Madurai", "Thanjavur", "Kanyakumari", "Rameswaram"].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <div className="location-preview mt-3 text-center">
                      {formData.location && (
                        <div className="selected-location">
                          <small className="text-muted">Selected: {formData.location}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Travel Details Card */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="position-relative">
                    <div style={{height: "150px", backgroundImage: "url('/api/placeholder/400/320')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-info rounded-pill">Travel Planning</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mb-3">
                      <i className="bi bi-people-fill me-2 text-primary"></i>
                      Travel Details
                    </h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Budget (INR):</label>
                        <div className="input-group">
                          <span className="input-group-text">₹</span>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="budget" 
                            min="1000" 
                            step="500" 
                            value={formData.budget} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Number of Travelers:</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="travelers" 
                            min="1" 
                            max="20" 
                            value={formData.travelers} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Travel Preferences Card */}
              <div className="col-md-12">
                <div className="card border-0 shadow-sm">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card-body">
                        <h5 className="card-title mb-3">
                          <i className="bi bi-heart-fill me-2 text-danger"></i>
                          Travel Preferences
                        </h5>
                        <p className="text-muted mb-3">Select the experiences you're looking for:</p>
                        <div className="row g-3">
                          {[
                            {name: "adventure", icon: "compass", desc: "Thrilling activities"},
                            {name: "luxury", icon: "gem", desc: "Premium experiences"},
                            {name: "food", icon: "egg-fried", desc: "Culinary delights"},
                            {name: "relaxation", icon: "umbrella", desc: "Peace and comfort"},
                            {name: "cultural", icon: "bank", desc: "Heritage sites"},
                            {name: "nature", icon: "tree", desc: "Natural beauty"}
                          ].map(preference => (
                            <div className="col-md-4" key={preference.name}>
                              <div className="card preference-card border mb-2 h-100">
                                <div className="card-body p-3">
                                  <div className="form-check">
                                    <input 
                                      className="form-check-input" 
                                      type="checkbox" 
                                      id={preference.name} 
                                      name="preferences" 
                                      value={preference.name} 
                                      checked={formData.preferences.includes(preference.name)} 
                                      onChange={handleChange} 
                                    />
                                    <label className="form-check-label w-100" htmlFor={preference.name}>
                                      <div className="d-flex flex-column">
                                        <span className="fw-bold">
                                          <i className={`bi bi-${preference.icon} me-2 text-primary`}></i>
                                          {preference.name.charAt(0).toUpperCase() + preference.name.slice(1)}
                                        </span>
                                        <small className="text-muted">{preference.desc}</small>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div style={{height: "100%", minHeight: "300px", backgroundImage: "url('/api/placeholder/400/320')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Accommodation & Transport Card */}
              <div className="col-md-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 border-end">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary p-2 rounded-circle me-3">
                            <i className="bi bi-house-fill text-white"></i>
                          </div>
                          <h5 className="card-title mb-0">Accommodation</h5>
                        </div>
                        <div className="mt-3">
                          <div className="accommodation-options">
                            <label className="form-label fw-semibold">Preferred Accommodation:</label>
                            <select 
                              className="form-select" 
                              name="accommodation" 
                              value={formData.accommodation} 
                              onChange={handleChange}
                            >
                              {["budget", "mid-range", "luxury"].map(option => (
                                <option key={option} value={option}>
                                  {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                              ))}
                            </select>
                            <div className="mt-3">
                              <div className="accommodation-image text-center">
                                <img 
                                  src="/api/placeholder/300/200" 
                                  alt="Accommodation" 
                                  className="img-fluid rounded" 
                                  style={{maxHeight: "120px"}} 
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary p-2 rounded-circle me-3">
                            <i className="bi bi-car-front-fill text-white"></i>
                          </div>
                          <h5 className="card-title mb-0">Transport</h5>
                        </div>
                        <div className="mt-3">
                          <div className="transport-options">
                            <label className="form-label fw-semibold">Preferred Transport:</label>
                            <select 
                              className="form-select" 
                              name="transport" 
                              value={formData.transport} 
                              onChange={handleChange}
                            >
                              {["public", "cab", "rental", "self-drive"].map(option => (
                                <option key={option} value={option}>
                                  {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                              ))}
                            </select>
                            <div className="mt-3">
                              <div className="transport-image text-center">
                                <img 
                                  src="/api/placeholder/300/200" 
                                  alt="Transport" 
                                  className="img-fluid rounded" 
                                  style={{maxHeight: "120px"}} 
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 py-3 shadow"
                style={{borderRadius: "50px"}}
              >
                <i className="bi bi-magic me-2"></i>
                Generate Your Personalized Itinerary
              </button>
            </div>
          </form>
          
          {/* Results Section */}
          {itinerary && (
            <div className="mt-5 animate__animated animate__fadeIn">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-success text-white p-3 d-flex align-items-center">
                  <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                  <h4 className="mb-0">Your Tamil Nadu Adventure</h4>
                </div>
                <div className="card-body">
                  <ItineraryResult plan={itinerary} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="card-footer bg-light p-3 text-center">
          <div className="d-flex justify-content-center align-items-center">
            <small className="text-muted">Explore the beauty of Tamil Nadu</small>
            <div className="ms-3 d-flex">
              <a href="#" className="text-primary mx-1"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-info mx-1"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-danger mx-1"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default ItineraryForm;













//     return (
//         <div className="container mt-5">
//             <div className="card shadow">
//                 <div className="card-header bg-primary text-white text-center">
//                     <h2>Tamil Nadu Itinerary Planner</h2>
//                 </div>
//                 <div className="card-body">
//                     {error && <div className="alert alert-danger">{error}</div>}
//                     <form onSubmit={handleSubmit}>
//                         <div className="row mb-3">
//                             <div className="col-md-6">
//                                 <label className="form-label">Start Date:</label>
//                                 <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
//                             </div>
//                             <div className="col-md-6">
//                                 <label className="form-label">End Date:</label>
//                                 <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} required />
//                             </div>
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Select Location:</label>
//                             <select className="form-select" name="location" value={formData.location} onChange={handleChange} required>
//                                 <option value="" disabled>Choose a location</option>
//                                 {["Chennai", "Vellore", "Pondicherry", "Mahabalipuram", "Ooty", "Kodaikanal", "Madurai", "Thanjavur", "Kanyakumari", "Rameswaram"].map(city => (
//                                     <option key={city} value={city}>{city}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="row mb-3">
//                             <div className="col-md-6">
//                                 <label className="form-label">Budget (INR):</label>
//                                 <input type="number" className="form-control" name="budget" min="1000" value={formData.budget} onChange={handleChange} required />
//                             </div>
//                             <div className="col-md-6">
//                                 <label className="form-label">Number of Travelers:</label>
//                                 <input type="number" className="form-control" name="travelers" min="1" max="20" value={formData.travelers} onChange={handleChange} required />
//                             </div>
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Travel Preferences:</label>
//                             <div className="row">
//                                 {["adventure", "luxury", "food", "relaxation", "cultural", "nature"].map(preference => (
//                                     <div className="col-md-4" key={preference}>
//                                         <div className="form-check">
//                                             <input className="form-check-input" type="checkbox" id={preference} name="preferences" value={preference} checked={formData.preferences.includes(preference)} onChange={handleChange} />
//                                             <label className="form-check-label" htmlFor={preference}>{preference}</label>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Preferred Accommodation:</label>
//                             <select className="form-select" name="accommodation" value={formData.accommodation} onChange={handleChange}>
//                                 {["budget", "mid-range", "luxury"].map(option => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Preferred Transport:</label>
//                             <select className="form-select" name="transport" value={formData.transport} onChange={handleChange}>
//                                 {["public", "cab", "rental"].map(option => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="d-grid">
//                             <button type="submit" className="btn btn-primary">Generate Itinerary</button>
//                         </div>
//                     </form>
//                     {itinerary && <ItineraryResult plan={itinerary} />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItineraryForm;
