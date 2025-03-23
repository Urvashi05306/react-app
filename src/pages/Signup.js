import React, { useState } from "react";
import "../css/registration.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    cmpname: "",
    agency: "",
  });

  const [errors, setErrors] = useState({});

  // Validation Functions
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let newErrors = { ...errors };
    if (name === "fullName") newErrors.fullName = value ? "" : "Full Name is required";
    if (name === "email") newErrors.email = validateEmail(value) ? "" : "Must contain @ in mail format";
    if (name === "password") newErrors.password = validatePassword(value) ? "" : "Weak password";
    if (name === "phone") newErrors.phone = validatePhone(value) ? "" : "Phone must be 10 digits";
    if (name === "agency") newErrors.agency = value ? "" : "Please select Yes or No";

    setErrors(newErrors);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate All Fields Before Submission
    let newErrors = {
      fullName: formData.fullName ? "" : "Full Name is required",
      email: validateEmail(formData.email) ? "" : "Must contain @ in mail format",
      password: validatePassword(formData.password) ? "" : "Password must have uppercase, lowercase, number & symbol",
      phone: validatePhone(formData.phone) ? "" : "Phone number must be 10 digits",
      agency: formData.agency ? "" : "Please select Yes or No",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      
      return;
    }

    // Store user data in localStorage (without profile image)
    localStorage.setItem("userData", JSON.stringify(formData));

    // Redirect to Account Settings
    navigate("/account-settings");
  };
  
  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Create your PopX account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="fullName">Full Name<span>*</span></label>
            <input type="text" id="fullName" name="fullName" className="custom-input" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="phone">Phone Number<span>*</span></label>
            <input type="text" id="phone" name="phone" className="custom-input" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">Email Address<span>*</span></label>
            <input type="email" id="email" name="email" className="custom-input" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password<span>*</span></label>
            <input type="password" id="password" name="password" className="custom-input" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="cmpname">Company Name</label>
            <input type="text" id="cmpname" name="cmpname" className="custom-input" value={formData.cmpname} onChange={handleChange} />
          </div>

          <div className="input-wrapper-btn">
            <label>Are you an Agency?<span>*</span></label>
            <div className="radio-options">
              <label>
                <input type="radio" name="agency" value="yes" checked={formData.agency === "yes"} onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="agency" value="no" checked={formData.agency === "no"} onChange={handleChange} /> No
              </label>
            </div>
            {errors.agency && <p className="error-message">{errors.agency}</p>}
          </div>

          <button type="submit" className="primary-button">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
