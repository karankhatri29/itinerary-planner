import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div style={{ borderRadius:25,background: "rgba(0, 0, 0, 0.4)" }}>
      {/* Hero Section */}
      <section className="text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">OUR MISSION</h1>
          <p className="lead">To create seamless, memorable experiences through innovation and customer dedication.</p>
        </div>
      </section>

      
      {/* Meet the Team */}
      <section className="container my-5 text-center">
        <h2 className="fw-bold text-white mb-4">Meet Our Team</h2>
        <div className="row">
          {[
            { name: "Karan Khatri", role: "CEO | Full Stack Developer" },
          ].map((member, index) => (
            <div key={index} className="col-md-4">
              <div className="card bg-transparent border-0 ">
                <h5 className="fw-bold text-white">{member.name}</h5>
                <p className="fw-bold text-white">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container my-5 ">
        <div className="row align-items-center">
            <h2 className="fw-bold text-white">Who We Are</h2>
            <p className="text-white">
              Welcome to our platform! We are a passionate team committed to delivering high-quality services and 
              unforgettable experiences. Our journey began with a vision to make travel and adventure seamless and enjoyable.
            </p>
          </div>
      </section>
    </div>
  );
};

export default About;
