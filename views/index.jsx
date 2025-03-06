import React from "react";
import { Outlet } from "react-router-dom";

const TamilNaduPlanner = ({ featuredDestinations = [], categories = [], testimonials = [] }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: "url('sample_image.jpg')" }}>
        <div className="hero-overlay"></div>
        <div className="container position-relative">
          <div className="row align-items-center" style={{ height: "75vh" }}>
            <div className="col-lg-6">
              <div className="hero-content text-white">
                <h1 className="display-4 fw-bold mb-4">Discover the Wonders of Tamil Nadu</h1>
                <p className="lead mb-4">
                  Create your perfect itinerary for exploring Tamil Nadu's rich culture, heritage, and natural beauty.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <a href="#plan-trip" className="btn btn-primary btn-lg px-4 me-md-2">
                    Plan Your Trip
                  </a>
                  <a href="/destinations" className="btn btn-outline-light btn-lg px-4">
                    Explore Destinations
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main>
        {/* Featured Destinations */}
        <section className="py-5">
          <div className="container">
            <div className="row mb-4 text-center">
              <div className="col-lg-8 mx-auto">
                <h2 className="section-title">Featured Destinations</h2>
                <p className="section-subtitle">Discover the most popular places to visit in Tamil Nadu</p>
              </div>
            </div>
            <div className="row">
              {featuredDestinations?.length > 0 ? (
                featuredDestinations.map((destination) => (
                  <div className="col-md-4 mb-4" key={destination.id}>
                    <div className="card destination-card h-100">
                      <img src={destination.imageUrl || "sample_image.jpg"} className="card-img-top" alt={destination.name} />
                      <div className="card-body">
                        <h5 className="card-title">{destination.name}</h5>
                        <p className="card-text">{destination.shortDescription}</p>
                        <div className="mb-2">
                          {destination.categories?.slice(0, 3).map((category, index) => (
                            <span className="badge bg-secondary me-1" key={index}>
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="card-footer bg-white border-top-0">
                        <a href={`/destinations/${destination.id}`} className="btn btn-outline-primary">
                          Explore
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Default destinations when none are provided
                [1, 2, 3].map((num) => (
                  <div className="col-md-4 mb-4" key={num}>
                    <div className="card destination-card h-100">
                      <img src="sample_image.jpg" className="card-img-top" alt={`Destination ${num}`} />
                      <div className="card-body">
                        <h5 className="card-title">Sample Destination {num}</h5>
                        <p className="card-text">Experience the beauty and culture of this amazing location in Tamil Nadu.</p>
                        <div className="mb-2">
                          <span className="badge bg-secondary me-1">Heritage</span>
                          <span className="badge bg-secondary me-1">Culture</span>
                        </div>
                      </div>
                      <div className="card-footer bg-white border-top-0">
                        <a href="/destinations/sample" className="btn btn-outline-primary">
                          Explore
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-4">
              <a href="/destinations" className="btn btn-primary">
                View All Destinations
              </a>
            </div>
          </div>
        </section>

        {/* Experience Categories */}
        <section className="py-5">
          <div className="container">
            <div className="row mb-4 text-center">
              <div className="col-lg-8 mx-auto">
                <h2 className="section-title">Experiences</h2>
                <p className="section-subtitle">Choose from a variety of experiences Tamil Nadu has to offer</p>
              </div>
            </div>
            <div className="row">
              {categories?.length > 0 ? (
                categories.map((category) => (
                  <div className="col-md-3 col-6 mb-4" key={category.slug}>
                    <div className="card category-card h-100 text-center">
                      <img src="sample_image.jpg" className="card-img-top" alt={category.name} />
                      <div className="card-body">
                        <div className="category-icon mb-3">
                          <i className={`${category.icon} fs-1`}></i>
                        </div>
                        <h5 className="card-title">{category.name}</h5>
                        <p className="card-text small">{category.description}</p>
                      </div>
                      <div className="card-footer bg-white border-top-0">
                        <a href={`/destinations?category=${category.slug}`} className="btn btn-sm btn-outline-primary">
                          Explore
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Default categories when none are provided
                ["Heritage", "Temples", "Nature", "Cuisine"].map((cat, index) => (
                  <div className="col-md-3 col-6 mb-4" key={index}>
                    <div className="card category-card h-100 text-center">
                      <img src="sample_image.jpg" className="card-img-top" alt={cat} />
                      <div className="card-body">
                        <div className="category-icon mb-3">
                          <i className="bi bi-star fs-1"></i>
                        </div>
                        <h5 className="card-title">{cat}</h5>
                        <p className="card-text small">Explore the amazing {cat.toLowerCase()} experiences in Tamil Nadu.</p>
                      </div>
                      <div className="card-footer bg-white border-top-0">
                        <a href={`/destinations?category=${cat.toLowerCase()}`} className="btn btn-sm btn-outline-primary">
                          Explore
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row mb-4 text-center">
              <div className="col-lg-8 mx-auto">
                <h2 className="section-title">What Travelers Say</h2>
                <p className="section-subtitle">Experiences shared by travelers who used our itinerary planner</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {testimonials?.length > 0 ? (
                      testimonials.map((testimonial, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                          <div className="row justify-content-center">
                            <div className="col-lg-8">
                              <div className="card">
                                <div className="card-body text-center p-5">
                                  <div className="testimonial-content">
                                    <div className="testimonial-quote mb-4">
                                      <i className="bi bi-quote fs-1 text-primary"></i>
                                    </div>
                                    <p className="lead mb-4">{testimonial.quote}</p>
                                    <div className="testimonial-person">
                                      <img src="sample_image.jpg" className="rounded-circle mb-3" alt={testimonial.name} width="80" height="80" />
                                      <h5 className="mb-0">{testimonial.name}</h5>
                                      <p className="text-muted">{testimonial.location}</p>
                                      <div className="rating text-warning">
                                        {testimonial.rating
                                          ? [...Array(testimonial.rating)].map((_, i) => (
                                              <i className="bi bi-star-fill" key={i}></i>
                                            ))
                                          : "No ratings yet"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Default testimonial when none are provided
                      <div className="carousel-item active">
                        <div className="row justify-content-center">
                          <div className="col-lg-8">
                            <div className="card">
                              <div className="card-body text-center p-5">
                                <div className="testimonial-content">
                                  <div className="testimonial-quote mb-4">
                                    <i className="bi bi-quote fs-1 text-primary"></i>
                                  </div>
                                  <p className="lead mb-4">"The Tamil Nadu Planner made our trip seamless and memorable. We discovered hidden gems we would have never found on our own!"</p>
                                  <div className="testimonial-person">
                                    <img src="sample_image.jpg" className="rounded-circle mb-3" alt="Sample Traveler" width="80" height="80" />
                                    <h5 className="mb-0">Jane Traveler</h5>
                                    <p className="text-muted">New York, USA</p>
                                    <div className="rating text-warning">
                                      <i className="bi bi-star-fill"></i>
                                      <i className="bi bi-star-fill"></i>
                                      <i className="bi bi-star-fill"></i>
                                      <i className="bi bi-star-fill"></i>
                                      <i className="bi bi-star-fill"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Outlet for Nested Routes */}
      <Outlet />
    </>
  );
};

export default TamilNaduPlanner;