import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import data from "../data.json";
import clip1 from "../assets/clip-01.jpg";
import clip2 from "../assets/clip-02.jpg";
import clip3 from "../assets/clip-03.jpg";
import clip4 from "../assets/clip-04.jpg";
import profile from "../assets/profile.jpg";
import profileg from "../assets/profileGirl.jpg";
import Cake from "../assets/Cake.webp";
import { useState, useEffect, Fragment } from "react";
// Define the User interface(Theoda)
interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  phone?: string;
  gender?: string;
}
import Footer from "../component/Footer";
function Profile() {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      fetch("http://localhost:3001/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            setUser(data);
          });
        } else {
          window.location.href = "/login";
        }
      });
    } else {
      window.location.href = "/login";
    }
  }, []);

  // var image = profile;
  // if (data.gender === "female") {
  //   image = profileg;
  // }
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
                      <div className="col-lg-4">
                        {/* Render user profile image here */}
                        <img
                          src={Cake}
                          alt="Profile Image"
                        />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <h1 id="firstname">Hey {user.firstName}!</h1>
                          <h5>Lovely to see you back on our cake page—your sweet tooth knows the way home!</h5>

                          <div className="main-border-button">
                            <a href="/Update">Update</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Name <span>{user.firstName + " " + user.lastName}</span>
                          </li>
                          <li>
                            Email <span>{user.email}</span>
                          </li>
                          <li>
                            Age <span>{user.age}</span>
                          </li>
                          <li>
                            Phone Number <span>{user.phone}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Rest of the JSX code */}
                    {/* ... */}
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
export default Profile;
