import "../Style/NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../component/Alert";


function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);


  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveLink("home");
    } else if (path === "/cart") {
      setActiveLink("cart");
    } else if (path === "/login") {
      setActiveLink("login");
    } else if (path === "/profile") {
      setActiveLink("profile");
    } else if (path === "/myorders") {
      setActiveLink("myorders");
    }
  }, [location.pathname]);

  const handleLinkClick = (name: string, path: string) => {
    setActiveLink(name);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        const response = await fetch("http://localhost:3001/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem("token");
          setAlert({
            title: "Log out Successfully!",
            message: "Please log in to access your personal details.",
            isSuccess: true,
          });
          setTimeout(() => {setAlert(null); navigate("/login")}, 3000); 
        } else {
          setAlert({
            title: "Authentication Error",
            message: "Failed to log out.",
            isSuccess: false,
          });
          setTimeout(() => {setAlert(null); navigate("/")}, 3000);
        }
      }else{
        setAlert({
          title: "You are already logged out.",
          message: "",
          isSuccess: true,
        });
        setTimeout(() => {setAlert(null); navigate("/")}, 3000);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      setAlert({
        title: "Error Occured",
        message: "An error occurred while logging out.",
        isSuccess: false,
      });
      setTimeout(() => {setAlert(null); navigate("/")}, 3000);
    }
  };

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="/" className="logo">
                <h4>
                  <span className="creative-text">Queen</span> Of Cake
                </h4>
              </a>
              <ul className="nav">
                <li>
                  <a
                    href="/"
                    className={`nav-item ${activeLink === "home" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("home", "/");
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/myorders"
                    className={`nav-item ${activeLink === "myorders" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("myorders", "/myorders");
                    }}
                  >
                    My Orders
                  </a>
                </li>
                <li>
                  <a
                    href="/cart"
                    className={`nav-item ${activeLink === "cart" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("cart", "/cart");
                    }}
                  >
                    Cart
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className={`nav-item ${activeLink === "login" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("login", "/login");
                    }}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className={`nav-item profile-tab ${activeLink === "profile" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("profile", "/profile");
                    }}
                  >
                    Profile 
                    {/* <img src="src/assets/profile-header.jpg" alt="" /> */}
                  </a>
                </li>
                <li>
                  <button
                    className="btn nav-item profile-tab logout-btn"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </nav>
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
    </header>
  );
}

export default NavBar;