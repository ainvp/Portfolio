import React, { useState } from "react";
import api from "../services/api";

const AddCar = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    transmission: "",
    fuelType: "",
    seats: "",
    image: "",
    description: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/cars", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Car Added Successfully!");

      console.log(response.data);

      // Reset form
      setFormData({
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        transmission: "",
        fuelType: "",
        seats: "",
        image: "",
        description: "",
        available: true,
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to add car");
    }
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Add New Car</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="pricePerDay"
          placeholder="Price Per Day"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
        />
        <br /><br />

        <select
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          required
        >
          <option value="">Select Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        <br /><br />

        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <br /><br />

        <input
          type="number"
          name="seats"
          placeholder="Seats"
          value={formData.seats}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="image"
          placeholder="Image URL (e.g. toyota.jpg)"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
        <br /><br />

        <label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Available
        </label>

        <br /><br />

        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;