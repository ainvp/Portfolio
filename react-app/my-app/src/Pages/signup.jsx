import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await api.post("/auth/register", formData);

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.data.role);

      alert(response.data.message || "Registration Successful!");

      // Redirect to Login page
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>

      <form onSubmit={handleSignup}>
        <div>
          <label>First Name</label>
          <br />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Last Name</label>
          <br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;