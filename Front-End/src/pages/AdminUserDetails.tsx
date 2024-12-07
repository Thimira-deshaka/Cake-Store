import "../Style/UserDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, Fragment } from "react";
import profileImage from "../assets/user.png";
import AdminNavBar from "../component/AdminNavBar";

function UserDetails() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    phone: "",
    profileImage: "",
    gender: "",
  });

  const userID = localStorage.getItem("userID"); // Get userID from localStorage

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
          setUserDetails(data); // Set user details
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  },[]);

  return (
    <Fragment>
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile">
                    <div className="row">
                      {/* Left Section: Profile Image */}
                      <div className="col-lg-4">
                        <img
                          src={userDetails.profileImage || profileImage}
                          alt="User Profile"
                          className="profile-image"
                        />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <h1 id="firstname">Hey!</h1>
                          <h5>Want to update {userDetails.firstName}'s profile</h5>
                        <div className="main-border-button">
                            <a href="/AdminUserUpdate">Update</a>
                          </div>
                        </div>
                      </div>
                      {/* Right Section: Additional Info */}
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Name <span>{userDetails.firstName} {userDetails.lastName}</span>
                          </li>
                          <li>
                            Email <span>{userDetails.email}</span>
                          </li>
                          <li>
                            Phone Number <span>{userDetails.phone}</span>
                          </li>
                          <li>
                            Age <span>{userDetails.age}</span>
                          </li>
                          <li>
                            Gender <span>{userDetails.gender}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserDetails;

