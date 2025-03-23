import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored user data
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (storedUser) {
      // Check if entered email and password match stored credentials
      if (storedUser.email === loginData.email && storedUser.password === loginData.password) {
        navigate("/account-settings"); // Redirect to Account Settings page
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("No account found. Please sign up first.");
    }
  };

  return (
    <div className="login-container">
      <h2>Signin to your PopX account</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter email address"
            name="email"
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
