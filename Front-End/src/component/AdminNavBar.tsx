import "../Style/AdminNavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../component/Alert";


function AdminNavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin/home") {
      setActiveLink("home");
    } else if (path === "/admin/users"|| path.startsWith("/userInfo")) {
      setActiveLink("user");
    } else if (path === "/admin/products" ||
      path.startsWith("/admin/adminproductInfo")) 
      {
        setActiveLink("product");
      } else {
        setActiveLink(""); // Default state for non-matching routes
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
        const response = await fetch("http://localhost:3004/admin/logout", {
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
          setTimeout(() => {setAlert(null); navigate("/admin")}, 3000); 
        } else {
          setAlert({
            title: "Authentication Error",
            message: "Failed to log out.",
            isSuccess: false,
          });
          setTimeout(() => {setAlert(null); localStorage.removeItem("token"); navigate("/admin")}, 2000);
        }
      }else{
        setAlert({
          title: "You are logging out.",
          message: "",
          isSuccess: true,
        });
        setTimeout(() => {setAlert(null); localStorage.removeItem("token"); navigate("/admin")}, 3000);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      setAlert({
        title: "Error Occured",
        message: "An error occurred while logging out.",
        isSuccess: false,
      });
      setTimeout(() => {setAlert(null); localStorage.removeItem("token"); navigate("/")}, 2000);
    }
  };

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="/admin/home" className="logo">
                <h4>
                  <span className="creative-text">Queen</span> Of Cake
                </h4>
              </a>
              <ul className="nav">
                <li>
                  <a
                    href="/admin/home"
                    className={`nav-item ${activeLink === "home" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("home", "/admin/home");
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/users"
                    className={`nav-item ${activeLink === "user" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("user", "/admin/users");
                    }}
                  >
                  
                  User
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/products"
                    className={`nav-item ${activeLink === "product" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("product", "/admin/products");
                    }}
                  >
                    Products
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

export default AdminNavBar;
