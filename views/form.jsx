import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ItineraryResult from "./result";
import TravelIllustration from "../src/components/TravelIllustration";

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

    return selectedActivities.filter(activity => activity.cost * userInput.travelers <= allocatedActivityBudget);
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

    const [selectedPreferences, setSelectedPreferences] = useState([]);
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
        console.log("Updated Preferences:", selectedPreferences);
    }, [selectedPreferences]);

    useEffect(() => {
        if (!formData.location || experiences.length === 0) return;
    
        const totalBudget = parseInt(formData.budget) || 0;
        if (totalBudget <= 0) return;
    
        const accommodationBudget = Math.floor(totalBudget * 0.4);
        const transportBudget = Math.floor(totalBudget * 0.2);
        const activityBudget = totalBudget - (accommodationBudget + transportBudget);
    
        const filtered = getFilteredActivities({ ...formData, preferences: selectedPreferences }, experiences, activityBudget)
            .map(activity => ({
                ...activity,
                cost: activity.cost * (formData.travelers || 1),
            }));
    
        setFilteredExperiences(filtered);
    
    }, [formData.location, formData.budget, formData.travelers, experiences, selectedPreferences]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Current Selected Preferences:", selectedPreferences);

        const completeFormData = {
            ...formData,
            preferences: [...selectedPreferences]  
        };

        console.log("Form Data before Itinerary Generation:", completeFormData);

        generateItinerary(completeFormData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "preferences") {
            setSelectedPreferences((prev) =>
                checked ? [...prev, value] : prev.filter(pref => pref !== value)
            );
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const generateItinerary = (finalData) => {
        console.log("Final Plan", finalData);
        let { budget, startDate, endDate, travelers } = finalData;
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
        let selectedActivities = filteredExperiences.slice(0, numDays * finalData.preferences.length);

        for (let i = 0; i < numDays; i++) {
            itineraryPlan.push({
                date: new Date(start.getTime() + i * 86400000).toDateString(),
                activities: selectedActivities.filter((_, index) => index % numDays === i)
            });
        }
        console.log("Itinerary Plan:", itineraryPlan);
        setItinerary({
            location: finalData.location,
            startDate,
            endDate,
            duration: numDays,
            travelers,
            budgetBreakdown,
            dailyItinerary: itineraryPlan,
            transportOptions: getTransportOptions(budgetBreakdown.Transport)
        });

        console.log("Itinerary Generated:", itinerary);
    };

    const getTransportOptions = (transportBudget) => [
        { type: "Flight", cost: transportBudget * 0.5 },
        { type: "Train", cost: transportBudget * 0.3 },
        { type: "City Transport", cost: transportBudget * 0.2 }
    ];

    const preferences = [
        { name: "adventure", icon: "compass", desc: "Thrilling activities" },
        { name: "luxury", icon: "gem", desc: "Premium experiences" },
        { name: "food", icon: "egg-fried", desc: "Culinary delights" },
        { name: "relaxation", icon: "umbrella", desc: "Peace and comfort" },
        { name: "cultural", icon: "bank", desc: "Heritage sites" },
        { name: "nature", icon: "tree", desc: "Natural beauty" },
    ];

    const handleCardClick = (preferenceName) => {
        setSelectedPreferences((prev) =>
            prev.includes(preferenceName)
                ? prev.filter((pref) => pref !== preferenceName)
                : [...prev, preferenceName]
        );
    };


    return (
        <div className="container-fluid py-5">
  <div className="row justify-content-center">
    <div className="col-lg-10">
      <div className="card border-0 shadow-lg rounded-lg overflow-hidden bg-white bg-opacity-95">
        <div className="card-header bg-warning text-white p-4 position-relative">
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="mb-0 fw-bold ">WanderSync Itinerary Planner</h2>
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
  
</div>

          
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Trip Duration Card */}
              {/* Trip Duration Card */}
<div className="col-md-12">
  <div 
    className="card border-0 shadow-lg rounded-4 position-relative overflow-hidden" 
    style={{ 
      background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))", 
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.2)"
    }}
  >
    
    {/* Floating Icon */}
    <div 
      className="position-absolute top-0 start-50 translate-middle bg-primary text-white p-3 rounded-circle shadow-lg" 
      style={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <i className="bi bi-calendar-event fs-4"></i>
    </div>

    <div className="row g-0">
      
      {/* Background Image Section */}
      <div className="col-md-4">
        <div 
          style={{ 
            height: "100%", 
            background: "url('/api/placeholder/400/320') center/cover no-repeat", 
            filter: "brightness(0.85) contrast(1.1)",
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px"
          }} 
        ></div>
      </div>

      {/* Input Section */}
      <div className="col-md-8">
        <div className="card-body p-5">
          <h5 className="card-title text-dark text-center mb-4">Trip Duration</h5>

          <div className="row g-4">
            {/* Start Date */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted">Start Date</label>
              <input 
                type="date" 
                className="form-control form-control-lg rounded-3 shadow-sm border-light transition-effect" 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* End Date */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted">End Date</label>
              <input 
                type="date" 
                className="form-control form-control-lg rounded-3 shadow-sm border-light transition-effect" 
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
                        <label className="form-label fw-semibold">Travelers:</label>
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
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="bi bi-heart-fill me-2 text-danger"></i>
            Travel Preferences
          </h5>
          <p className="text-muted mb-3">Select the experiences you're looking for:</p>
          <div className="row g-3">
            {preferences.map((preference) => (
              <div className="col-md-4" key={preference.name}>
                <div
                  className={`card preference-card border mb-2 h-100 ${
                    selectedPreferences.includes(preference.name)
                      ? "border-primary shadow"
                      : ""
                  }`}
                  onClick={() => handleCardClick(preference.name)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body p-3">
                    <div className="d-flex flex-column">
                      <span className="fw-bold">
                        <i className={`bi bi-${preference.icon} me-2 text-primary`}></i>
                        {preference.name.charAt(0).toUpperCase() + preference.name.slice(1)}
                      </span>
                      <small className="text-muted">{preference.desc}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Selected Preferences Display */}
          {selectedPreferences.length > 0 && (
            <div className="mt-3">
              <h6>Selected Preferences:</h6>
              <p className="text-primary">{selectedPreferences.join(", ")}</p>
            </div>
          )}
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
                className="btn btn-danger btn-lg w-100 py-3 shadow"
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
                  <h4 className="mb-0">Plan Created Specially for you</h4>
                </div>
                <div className="card-body">
                  <ItineraryResult plan={itinerary} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-12">
    <div 
      className="card border-0 shadow-lg rounded-4 text-center p-4" 
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <div className="card-body">
        {/* Travel Illustration */}
        <TravelIllustration />

        {/* Inspiring Text */}
        <h5 className="fw-bold text-dark">"Travel is the only thing you buy that makes you richer."</h5>
        <p className="text-muted mb-0">Embark on your next adventure—discover stunning landscapes, vibrant cultures, and unforgettable experiences.</p>
      </div>
    </div>
  </div>
        
        <div className="card-footer bg-light p-3 text-center">
          <div className="d-flex justify-content-center align-items-center">
            <small className="text-muted">Explore India</small>
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











