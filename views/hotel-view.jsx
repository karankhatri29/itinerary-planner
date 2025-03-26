import React, { useState, useEffect } from "react";
import jsonData from "../public/data/hotels.json";
import SearchIllustration from "../src/components/SearchingIllustration.jsx";

const HotelSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("budget");

    const handleSearch = () => {
        const cityData = jsonData.find(city => city.city.toLowerCase() === searchTerm.toLowerCase());
        setSelectedCity(cityData || null);
    };

    console.log("Selectedcity:", selectedCity);



    return (
        <div className="p-4 " style={{background: "rgba(255, 255, 255, 0.7)",width:"innerWidth"}}>
            <div className=" ">
            <input
                type="text"
                placeholder="Search city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} style={{padding:"0px",width:"80px",height:"40px",alignItems:"center"}}>Search</button>
            </div>
            {selectedCity && (
                <div>
                    <h2>Hotels in {selectedCity.city}...</h2>
                    <div className="align-items-center m-3">
                        {["budget", "standard", "luxury"].map((category) => (
                            <button
                                key={category}
                                className={selectedCategory === category ? "selected" : ""}
                                onClick={() => setSelectedCategory(category)}
                                style={{marginLeft:"10px"}}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="hotel-list mb-12 text-dark">
                        {selectedCity.hotels[selectedCategory]?.map((hotel, index) => (
                            <div key={index} className="hotel-card bg-white border border-dark border-round mt-4 p-4" style={{ display: "flex" }}>
                                <div className="hotel-card-left" style={{ flex: 1.2 }}>
                                    <div className="position-relative">
                                        <span className="position-absolute top-0 end-0 badge bg-danger rounded-pill m-2">
                                            {hotel.ratings} ⭐
                                        </span>
                                    </div>
                                    {hotel.image && (
                                        <img src={hotel.image} className="card-img-top" alt={hotel.name} style={{ height: "220px", width: "220px", objectFit: "cover" }} />
                                    )}
                                </div>

                                <div className="hotel-card-mid" style={{ flex: 3, backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "10px" }}>
                                    <h3>{hotel.name}</h3>
                                    <p><strong>Location:</strong> {hotel.location} | <strong> Check-in Time:</strong> {hotel.checkin_time} | <strong> Breakfast:</strong> {hotel.breakfast_provided ? "Included" : "Not Included"}</p>
                                    <p>{hotel.amenities.join(" | ")}</p>
                                    <p className="hotel-price">₹{hotel.price} + taxes & fees per night</p>
                                    <button onClick={() => window.open(hotel.google_maps_url, "_blank")} className="map-link">
                                        View on Google Maps
                                    </button>
                                </div>

                                <div className="hotel-card-right" style={{ flex: 1.6, backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "10px" }}>
                                    <h4>Room Details</h4>
                                    <ul>
                                        {hotel.rooms.map((room, idx) => (
                                            <li key={idx}><p><strong>{room.type}:</strong> ₹{room.fare_per_night} per night, Max Guests: {room.max_guests}</p></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )) || <p>No hotels found in this category.</p>}
                    </div>
                </div>
            )}
            <div className="search-illustration" style={{ textAlign: "center", marginTop: "20px",marginBottom :"20px" }}>
            <SearchIllustration/>
        <p>Happy Searching!</p>
      </div>

        </div>
    );
};

export default HotelSearch;
