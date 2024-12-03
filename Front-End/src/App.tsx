import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductInfo from "./pages/ProductInfo";
import Register from "./pages/Register";
import { Fragment } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import NavBar from "./component/NavBar";
import AdminNavBar from "./component/AdminNavBar";
function App() {
  return (
    <Router>
    <Fragment>
      <NavBar />
      {/* <AdminNavBar /> */}
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productInfo/:productId" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
     
    </Fragment>
    </Router>
  );
}
export default App;
