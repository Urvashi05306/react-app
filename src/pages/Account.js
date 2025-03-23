import React, { useState, useEffect } from "react";
import "../css/account-settings.css";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
      setProfileImage(storedUserData.profileImage || "https://via.placeholder.com/100");
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);

        // Update localStorage
        const updatedUserData = { ...userData, profileImage: reader.result };
        setUserData(updatedUserData);
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="account-body">
    <div className="account-settings-container">
      <h2>Account Settings</h2>
      
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
          <label htmlFor="upload">
            <span className="camera-icon">📷</span>
          </label>
          <input type="file" id="upload" accept="image/*" onChange={handleImageUpload} hidden />
        </div>
        <div className="user-info">
          <h3>{userData.fullName}</h3>
          <p>{userData.email}</p>
        </div>
      </div>

      {/* Description Section */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      {/* Additional Details Section */}
      <div className="additional-info">
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Company:</strong> {userData.cmpname || "N/A"}</p>
        <p><strong>Agency:</strong> {userData.agency}</p>
      </div>
    </div>
    </div>
  );
};

export default Account;
