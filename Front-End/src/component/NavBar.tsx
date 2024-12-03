// import "../Style/NavBar.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";
// import handleSearch from "../pages/Home";
// function NavBar() {
//   const [activeLink, setActiveLink] = useState("home");
  
//     const handleLinkClick = (name: string) => {
//       setActiveLink(name);
//     };
//     return (
//       <header className="header-area header-sticky">
//   <div className="container">
//     <div className="row">
//       <div className="col-12">
//         <nav className="main-nav">
//           <a href="/" className="logo">
//             <h4>
//               <span className="creative-text">Queen</span> Of Cake
//             </h4>
//           </a>
//           <ul className="nav">
//             <li>
//               <a
//                 href="/"
//                 className={`nav-item ${activeLink === "home" ? "active" : ""}`}
//                 onClick={() => handleLinkClick("home")}
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/cart"
//                 className={`nav-item ${activeLink === "cart" ? "active" : ""}`}
//                 onClick={() => handleLinkClick("cart")}
//               >
//                 Cart
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/login"
//                 className={`nav-item ${activeLink === "login" ? "active" : ""}`}
//                 onClick={() => handleLinkClick("login")}
//               >
//                 Login
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/profile"
//                 className={`nav-item profile-tab ${activeLink === "profile" ? "active" : ""}`}
//                 onClick={() => handleLinkClick("profile")}
//               >
//                 Profile <img src="src/assets/profile-header.jpg" alt="" />
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   </div>
// </header>

//     );
//   }
// export default NavBar;


import "../Style/NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

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
                    Profile <img src="src/assets/profile-header.jpg" alt="" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;