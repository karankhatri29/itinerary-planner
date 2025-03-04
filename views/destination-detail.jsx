import React from 'react';
import { Link } from 'react-router-dom';

const DestinationDetail = ({ destination }) => {
    if (!destination) {
        return <div className="container mt-4"><h2>Destination not found</h2></div>;
    }

    return (
        <div className="container mt-4">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/destinations">Destinations</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{destination?.name}</li>
                </ol>
            </nav>
            
            {/* Destination Header */}
            <div className="destination-header mb-4">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h1>{destination?.name}</h1>
                        <div className="categories mb-2">
                            {destination?.categories?.map((category, index) => (
                                <span key={index} className="badge bg-secondary me-1">{category}</span>
                            ))}
                        </div>
                        <p className="lead">{destination?.tagline}</p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <Link to="/" className="btn btn-primary">Plan a Trip Here</Link>
                    </div>
                </div>
            </div>
            
            {/* Carousel for Images */}
            <div className="row mb-4">
                <div className="col-md-8">
                    <div id="destinationCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {destination?.images?.map((image, index) => (
                                <button key={index} type="button" data-bs-target="#destinationCarousel" data-bs-slide-to={index} 
                                    className={index === 0 ? 'active' : ''}></button>
                            ))}
                        </div>
                        <div className="carousel-inner rounded">
                            {destination?.images?.map((image, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={image?.url} className="d-block w-100" alt={image?.alt || 'Image'} />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>{image?.title}</h5>
                                        <p>{image?.caption}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#destinationCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#destinationCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    
                    {/* Destination Details */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">About {destination?.name}</h2>
                            <p className="card-text">{destination?.description}</p>
                            {destination?.history && (
                                <>
                                    <h3>History</h3>
                                    <p>{destination?.history}</p>
                                </>
                            )}
                            {destination?.culture && (
                                <>
                                    <h3>Culture</h3>
                                    <p>{destination?.culture}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Sidebar: Plan Your Visit */}
                <div className="col-md-4">
                    <div className="card mb-4 sticky-top" style={{ top: '20px', zIndex: '1' }}>
                        <div className="card-header bg-primary text-white">
                            <h3 className="card-title mb-0">Plan Your Visit</h3>
                        </div>
                        <div className="card-body">
                            <h5>Best Time to Visit</h5>
                            <p>{destination?.bestTimeToVisit}</p>
                            
                            <h5>How to Reach</h5>
                            <ul className="list-group mb-3">
                                {destination?.howToReach?.air && (
                                    <li className="list-group-item">
                                        <strong>By Air:</strong> {destination?.howToReach?.air}
                                    </li>
                                )}
                                {destination?.howToReach?.train && (
                                    <li className="list-group-item">
                                        <strong>By Train:</strong> {destination?.howToReach?.train}
                                    </li>
                                )}
                                {destination?.howToReach?.road && (
                                    <li className="list-group-item">
                                        <strong>By Road:</strong> {destination?.howToReach?.road}
                                    </li>
                                )}
                            </ul>
                            <Link to="/" className="btn btn-primary w-100">Plan Your Itinerary</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetail;
