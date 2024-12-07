import React, { useState, useEffect, Fragment } from "react";
import "../Style/Update.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import Alert from "../component/Alert";

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
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);

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
      setAlert({
        title: "Authentication Error",
        message: "Please log in to update your profile.",
        isSuccess: false,
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
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

    if (!token) {
      setAlert({
        title: "Authentication Error",
        message: "Please log in to save changes.",
        isSuccess: false,
      });
      return;
    }

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
        setAlert({
          title: "Success",
          message: "Profile updated successfully!",
          isSuccess: true,
        });

        setTimeout(() => {
          window.location.href = "/profile";
        }, 1500);
      } else {
        setAlert({
          title: "Error",
          message: "Failed to update profile. Please try again.",
          isSuccess: false,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlert({
        title: "Error",
        message: "An error occurred while updating your profile.",
        isSuccess: false,
      });
    }
  };

  return (
    <Fragment>
      <NavBar />
      <div className="update-page-container mt-5">
        <h2 className="text-center">Update Your Profile</h2>
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

      {alert && (
        <div
          style={{
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
        </div>
      )}
    </Fragment>
  );
}

export default Update;
