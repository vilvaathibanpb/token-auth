import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [userData, setData] = useState();
  const navigate = useNavigate();

  const getProfileData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const response = await fetch("http://localhost:4000/profile", options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    setData(data);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getProfileData();
  }, []);

  if (!userData) return <h4>Loading....</h4>;
  return (
    <div className="profile-container">
      <h1>Profile Details</h1>
      <p><b>Name:</b> {userData.username}</p>
      <p><b>Email:</b> {userData.email}</p>
      <button className="signout-button" onClick={() => handleSignout()}>Signout</button>
    </div>
  );
};

export default Profile;
