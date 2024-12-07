
import React, { Fragment, useEffect, useState } from "react";
import "../Style/AdminUserView.css"
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "../component/UserCard";
import { useNavigate } from "react-router-dom";
import Alert from "../component/Alert";


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
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);


  const navigate = useNavigate(); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/users/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.log("Failed to fetch ");
        setAlert({
          title: "Failed",
          message: "cannot fetch users",
          isSuccess: false,
        });
        setTimeout(() => {setAlert(null); localStorage.removeItem("token"); navigate("/admin")}, 3000);
        return;

      }
    } catch (error) {
      console.error("Error:", error);
        setAlert({
          title: "Failed",
          message: "Error: "+ error,
          isSuccess: false,
        });
        setTimeout(() => {setAlert(null); localStorage.removeItem("token"); navigate("/admin")}, 3000);
        return;
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
      {alert && (
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            zIndex: 1000,
          }}
        >
          <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
        </div>
      )}
    </Fragment>
  );
}

export default AdminUserView;


