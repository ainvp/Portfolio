import React from "react";
import { useNavigate } from "react-router-dom";
import "./CarCard.css";

const CarCard = ({ car }) => {

    const navigate = useNavigate();

    return (

        <div className="car-card">

            <img src={car.image} alt={car.brand} />

            <h2>{car.brand} {car.model}</h2>

            <p>₹ {car.pricePerDay} / day</p>

            <p>{car.fuelType}</p>

            <p>{car.transmission}</p>

            <button
                onClick={() => navigate(`/cars/${car._id}`)}
            >
                View Details
            </button>

        </div>

    );

};

export default CarCard;