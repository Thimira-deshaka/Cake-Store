import React, { useState, useEffect, Fragment } from "react";
import "../Style/Update.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import { useNavigate } from "react-router-dom";
import Alert from "../component/Alert";  // Import the Alert component

function AdminUserUpdate() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    phone: "",
    gender: "",
  });
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);  // State for alert
  const userID = localStorage.getItem("userID"); // Fetch userID from localStorage

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/all/${userID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data); // Populate form with fetched data
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userID]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/users/update/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        setAlert({
          title: "Success",
          message: "Profile updated successfully!",
          isSuccess: true,
        });
        setTimeout(() => {
          setAlert(null);
          navigate("/admin/users");
        }, 2000);
      } else {
        setAlert({
          title: "Error",
          message: "Failed to update profile. Please try again.",
          isSuccess: false,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlert({
        title: "Error",
        message: "An error occurred while updating your profile.",
        isSuccess: false,
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <Fragment>
      <div className="update-page-container mt-5">
        <h2 className="text-center">Update Your Profile</h2>
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
        <form onSubmit={handleSubmit} className="profile-update-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userDetails.firstName}
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
              value={userDetails.lastName}
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
              value={userDetails.email}
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
              value={userDetails.age}
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
              value={userDetails.phone}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={userDetails.gender}
              onChange={handleInputChange}
              className="form-control"
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

export default AdminUserUpdate;
