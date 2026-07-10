import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Rent Your Dream Car</h1>

        <p>
          Find the perfect car at the best price for your next journey.
        </p>

        <button
          className="explore-btn"
          onClick={() => navigate("/cars")}
        >
          Explore Cars
        </button>
      </div>
    </section>
  );
};

export default Hero;