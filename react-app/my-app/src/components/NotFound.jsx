import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for might have been removed,
          renamed, or is temporarily unavailable.
        </p>

        <Link to="/" className="home-btn">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;