//Update.jsx

import React, { useState, useEffect, Fragment } from "react";
import "../Style/Update.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
}

function Update() {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    phone: "",
  });
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3001/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setMessage("Profile updated successfully!");
        window.location.href = "/profile";
      } else {
        setMessage("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred while updating your profile.");
    }
  };

  return (
    <Fragment>
      <NavBar />
      <div className="update-page-container mt-5">
        <h2 className="text-center">Update Your Profile</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit} className="profile-update-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={user.age}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Update;
