import "../Style/AdminNavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminNavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

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
                {/* <li>
                  <a
                    href="/profile"
                    className={`nav-item profile-tab ${activeLink === "profile" ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("profile", "/profile");
                    }}
                  >
                   Promotions
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavBar;
