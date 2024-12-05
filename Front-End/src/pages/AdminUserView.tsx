import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
import React, { Fragment, useEffect, useState } from "react";
// import "../Style/home.css";
import "../Style/AdminUserView.css"
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "../component/UserCard";
import { useNavigate } from "react-router-dom";

function AdminUserView() {
  const [data, setData] = useState([
    {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      phone: "",
      gender: "",
    },
  ]);

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/all", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLinkClick = (userID: string) => {
    localStorage.setItem("userID", userID);
    navigate(`/userInfo/${userID}`); // Redirect to user details page
  };

  return (
    <Fragment>
      <div className="wid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-content">
                <div className="most-popular">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading-section inline">
                        <h4>Users</h4>
                      </div>
                      <div className="row">
                        {data.map((user) => (
                          <div
                            className="col-lg-3 col-sm-6"
                            onClick={() => handleLinkClick(user._id)}
                            style={{ cursor: "pointer" }}
                            key={user._id}
                          >
                            <UserCard
                              firstName={user.firstName}
                              lastName={user.lastName}
                              // phone={user.phone}
                            />
                          </div>
                        ))}
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

export default AdminUserView;


