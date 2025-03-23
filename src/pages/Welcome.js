import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="content">
        {/* Header Content */}
        <div className="header-content">
          <h1>Welcome to PopX</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* Buttons (Everything at the bottom) */}
        <div className="button-container">
          <button className="primary-btn" onClick={() => navigate("/signup")}>
            Create Account
          </button>
          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
