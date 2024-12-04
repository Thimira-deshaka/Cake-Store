import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductInfo from "./pages/ProductInfo";
import Register from "./pages/Register";
import { Fragment } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Update from "./pages/Update";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AdminUserView from "./pages/AdminUserView";
import AdminProductView from "./pages/AdminProductView";
import AdminUserDetails from "./pages/AdminUserDetails";
import AdminProductInfo from "./pages/AdminProductInfo";
function App() {
  return (
    
      <Router>
        <Fragment>

        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productInfo/:productId" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/update" element={<Update />} />

          {/*Admin pages*/}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<AdminUserView />} />
          <Route path="/userInfo/:userId" element={<AdminUserDetails />} />
          <Route path="/admin/products" element={<AdminProductView />} />
          <Route path="/admin/adminproductInfo/:productId" element={<AdminProductInfo/>} />
        </Routes>
     
    </Fragment>
    </Router>
  );
}
export default App;
