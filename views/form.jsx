import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ItineraryResult from "./result";

const getFilteredActivities = (userInput, experiences) => { 
    const locationData = experiences.find(exp => exp.name === userInput.location);
    console.log("user input:",userInput);
    console.log("data:",experiences);
    if (!locationData) {
        console.log("Location not found!");
        return [];
    }

    let selectedActivities = [];
    console.log("user Preferences:",userInput.preferences); 
    userInput.preferences.forEach(pref => {
        if (locationData[pref]) {
            selectedActivities.push(...locationData[pref]);
        }
    });

    return selectedActivities;
};

const ItineraryForm = () => {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        location: "",
        budget: "",
        travelers: 1,
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
            const filtered = getFilteredActivities(formData, experiences).map(activity => ({
                name: activity.name,
                description: activity.description,
                cost: activity.cost,
                duration: activity.duration,
                rating: activity.rating,
                bestTime: activity.bestTime,
                includesMeal: activity.includesMeal
            }));
            setFilteredExperiences(filtered);
            console.log("Updated Filtered Experiences:", filtered);
        }
    }, [formData.location, formData.preferences, experiences]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" 
                ? checked 
                    ? [...prev.preferences, value] 
                    : prev.preferences.filter(pref => pref !== value)
                : value
        }));
    };

    const validateForm = () => {
        const { startDate, endDate, budget } = formData;
        if (!startDate || !endDate) return "Please select valid start and end dates.";
        if (new Date(startDate) > new Date(endDate)) return "End date must be after the start date.";
        if (parseInt(budget) < 1000) return "Budget should be at least ₹1000.";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");
        generateItinerary();
    };

    const generateItinerary = () => {
        let { budget, startDate, endDate } = formData;
        let itineraryPlan = [];
        let totalBudget = parseInt(budget);
        let start = new Date(startDate);
        let end = new Date(endDate);
        console.log("this is the data recieved in generate function:",filteredExperiences);
        while (start <= end && totalBudget > 0) {
            const dayPlan = [];
            if (filteredExperiences.length === 0) {
                console.warn("No experiences available");
                break;
            }

            filteredExperiences.sort((a, b) => a.cost - b.cost);
            console.log("Sorted filetered experience",filteredExperiences);
            for (let exp of filteredExperiences) {
                console.log("experience:",exp);
                if (totalBudget >= exp.cost) {
                    dayPlan.push({ name: exp.name, description: exp.description, cost: exp.cost });
                    totalBudget -= exp.cost;
                }
            }

            if (dayPlan.length > 0) {
                console.log("Day Plan:",dayPlan);
                itineraryPlan.push({ date: start.toDateString(), activities: dayPlan });
            } else {
                console.warn("No activities found for that day");
            }
            
            start.setDate(start.getDate() + 1);
        }
        console.log(itineraryPlan);

        const structuredPlan = {
            location: formData.location,
            startDate,
            endDate,
            duration: itineraryPlan.length,
            travelers: formData.travelers,
            budgetBreakdown: {
                Accommodation: Math.floor(parseInt(budget) * 0.4),
                Transport: Math.floor(parseInt(budget) * 0.2),
                Activities: parseInt(budget) - (Math.floor(parseInt(budget) * 0.6))
            },
            dailyItinerary: itineraryPlan
        };

        setItinerary(structuredPlan);
        console.log("Structured Plan Created:",structuredPlan);
        console.log("Itinerary:",itinerary);
    };

    
    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Tamil Nadu Itinerary Planner</h2>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Start Date:</label>
                                <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">End Date:</label>
                                <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Location:</label>
                            <select className="form-select" name="location" value={formData.location} onChange={handleChange} required>
                                <option value="" disabled>Choose a location</option>
                                {["Chennai", "Vellore", "Pondicherry", "Mahabalipuram", "Ooty", "Kodaikanal", "Madurai", "Thanjavur", "Kanyakumari", "Rameswaram"].map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Budget (INR):</label>
                                <input type="number" className="form-control" name="budget" min="1000" value={formData.budget} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Number of Travelers:</label>
                                <input type="number" className="form-control" name="travelers" min="1" max="20" value={formData.travelers} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Travel Preferences:</label>
                            <div className="row">
                                {["adventure", "luxury", "food", "relaxation", "cultural", "nature"].map(preference => (
                                    <div className="col-md-4" key={preference}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id={preference} name="preferences" value={preference} checked={formData.preferences.includes(preference)} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor={preference}>{preference}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preferred Accommodation:</label>
                            <select className="form-select" name="accommodation" value={formData.accommodation} onChange={handleChange}>
                                {["budget", "mid-range", "luxury"].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preferred Transport:</label>
                            <select className="form-select" name="transport" value={formData.transport} onChange={handleChange}>
                                {["public", "cab", "rental"].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Generate Itinerary</button>
                        </div>
                    </form>
                    {itinerary && <ItineraryResult plan={itinerary} />}
                </div>
            </div>
        </div>
    );
};

export default ItineraryForm;
