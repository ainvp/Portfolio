import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await api.get("/cars");
      setCars(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const clearForm = () => {
    setEditingId(null);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/cars/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Car updated successfully");
      } else {
        await api.post("/cars", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Car added successfully");
      }

      clearForm();
      fetchCars();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (car) => {
    setEditingId(car._id);

    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay,
      transmission: car.transmission,
      fuelType: car.fuelType,
      seats: car.seats,
      image: car.image,
      description: car.description,
      available: car.available,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Car deleted successfully");
      fetchCars();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="dashboard">

      <h1>Admin Dashboard</h1>

      <div className="dashboard-container">

        <div className="form-section">

          <h2>{editingId ? "Update Car" : "Add New Car"}</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="pricePerDay"
              placeholder="Price Per Day"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="transmission"
              placeholder="Transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
            />
                        <input
              type="text"
              name="fuelType"
              placeholder="Fuel Type"
              value={formData.fuelType}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="seats"
              placeholder="Seats"
              value={formData.seats}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <label className="checkbox">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
              Available
            </label>

            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="preview-image"
              />
            )}

            <div className="button-group">
              <button type="submit">
                {editingId ? "Update Car" : "Add Car"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="cars-section">

          <h2>Manage Cars</h2>

          <div className="cars-grid">

            {cars.map((car) => (
              <div className="dashboard-card" key={car._id}>

                <img
                  src={car.image}
                  alt={car.brand}
                />

                <div className="card-content">

                  <h3>
                    {car.brand} {car.model}
                  </h3>

                  <p>
                    <strong>Year:</strong> {car.year}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{car.pricePerDay}/day
                  </p>

                  <p>
                    <strong>Fuel:</strong> {car.fuelType}
                  </p>

                  <p>
                    <strong>Transmission:</strong> {car.transmission}
                  </p>

                  <p>
                    <strong>Seats:</strong> {car.seats}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {car.available ? "Available" : "Unavailable"}
                  </p>

                  <div className="card-buttons">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(car)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;