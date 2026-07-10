import React, { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard/CarCard";
import "./Cars.css";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await api.get("/cars");
      setCars(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cars-page">
      <h1>Available Cars</h1>

      <div className="cars-grid">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Cars;