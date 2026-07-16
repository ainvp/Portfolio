import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);

  

useEffect(() => {
  const fetchCar = async () => {
    try {
      const response = await api.get(`/cars/${id}`);
      setCar(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchCar();
}, [id]);

  if (!car) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="car-details-container">

      <div className="car-image">
        <img src={car.image} alt={car.brand} />
      </div>

      <div className="car-info">

        <h1>
          {car.brand} {car.model}
        </h1>

        <h2>₹ {car.pricePerDay} / Day</h2>

        <div className="details-grid">
          <p><strong>Brand:</strong> {car.brand}</p>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Seats:</strong> {car.seats}</p>

          <p>
            <strong>Status:</strong>{" "}
            {car.available ? "Available" : "Unavailable"}
          </p>
        </div>

        <h3>Description</h3>

        <p>{car.description}</p>

        <div className="buttons">

          <button
            className="book-btn"
            onClick={() => alert("Booking feature coming soon")}
          >
            Book Now
          </button>

          <button
            className="back-btn"
            onClick={() => navigate("/cars")}
          >
            Back
          </button>

        </div>

      </div>

    </div>
  );
};

export default CarDetails;