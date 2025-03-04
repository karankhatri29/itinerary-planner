import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                preferences: checked
                    ? [...prev.preferences, value]
                    : prev.preferences.filter((pref) => pref !== value)
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Here, you can send formData to an API or handle it as needed
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Tamil Nadu Itinerary Planner</h2>
                </div>
                <div className="card-body">
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
                                {["Chennai", "Vellore", "Pondicherry", "Mahabalipuram", "Ooty", "Kodaikanal", "Madurai", "Thanjavur", "Kanyakumari", "Rameswaram"].map((city) => (
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
                                {["adventure", "luxury", "food", "relaxation", "cultural", "nature"].map((preference) => (
                                    <div className="col-md-4" key={preference}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id={preference} name="preferences" value={preference} checked={formData.preferences.includes(preference)} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor={preference}>{preference.replace("_", " & ")}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preferred Accommodation:</label>
                            <select className="form-select" name="accommodation" value={formData.accommodation} onChange={handleChange}>
                                {["budget", "mid-range", "luxury"].map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preferred Transport:</label>
                            <select className="form-select" name="transport" value={formData.transport} onChange={handleChange}>
                                {["public", "cab", "rental"].map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Generate Itinerary</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ItineraryForm;
