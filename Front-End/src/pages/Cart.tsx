import { Fragment, useEffect, useState } from "react";
import deletesvg from "../assets/delete.svg";
import "../Style/Cart.css";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import Alert from "../component/Alert";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartData, setCartData] = useState({ total: 0, Orders: [] });
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setAlert({
            title: "Authentication Error",
            message: "Please log in to access your cart.",
            isSuccess: false,
          });
          setTimeout(() => {setAlert(null); navigate("/login")}, 3000);
          return;
        }

        const response = await fetch("http://localhost:3003/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data !== "Cart is empty") {
            setCartData(data);
          }
        } else {
          if (response.status === 401) {
            setAlert({
              title: "Session Expired",
              message: "Your session has expired. Please log in again.",
              isSuccess: false,
            });
            setTimeout(() => {setAlert(null); navigate("/login")}, 3000);
          } else {
            setAlert({
              title: "Error",
              message: "Failed to fetch cart data. Please try again later.",
              isSuccess: false,
            });
            setTimeout(() => setAlert(null), 3000);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setAlert({
          title: "Error",
          message: "An unexpected error occurred while fetching your cart.",
          isSuccess: false,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    };

    fetchCartData();
  }, []);

  const handleCheckout = () => {
    if (cartData.Orders.length === 0) {
      setAlert({
        title: "Empty Cart",
        message: "Your cart is empty. Please add items to proceed.",
        isSuccess: false,
      });
      setTimeout(() => setAlert(null), 3000);
    } else {
      window.location.href = "/Checkout";

    }
};

  

  const deleteOrder = async (orderId: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3003/cart/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAlert({
          title: "Success",
          message: "Order deleted successfully.",
          isSuccess: true,
        });
        setTimeout(() => setAlert(null), 3000);
        setCartData((prev) => ({
          ...prev,
          Orders: prev.Orders.filter((order: any) => order.OrderId !== orderId),
        }));
      } else {
        setAlert({
          title: "Error",
          message: "Failed to delete the order. Please try again.",
          isSuccess: false,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        title: "Error",
        message: "An error occurred while deleting the order.",
        isSuccess: false,
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <Fragment>
      <div className="backgrounds">
        <div className="spacefo2">
          <div className="cart-page">
            <div className="cart-page-container">
              <div className="cart-page-header">
                <h2 className="cart-header-text">Cake Cart</h2>
              </div>
              <div className="cart-page-para">
                <h4 className="cart-para-text">
                  Your sweetest cravings are just a click away! 🍰 <br />
                  Here lies your handpicked collection of delightful treats, <br />
                  crafted with love and ready to make your day sweeter.
                </h4>
              </div>
              <div className="cart-page-table">
                <table className="cart-table-product">
                  <thead>
                    <tr className="cart-table-header">
                      <th className="cart-table-img">Image of the Ordered Cake</th>
                      <th className="cart-table-desktop cart-table-payment">Name</th>
                      <th className="cart-table-desktop cart-table-size">Category</th>
                      <th className="cart-table-size right-text-mobile">Price</th>
                      <th className="cart-table-size right-text-mobile"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData &&
                    cartData.Orders &&
                    cartData.Orders.length > 0 ? (
                      cartData.Orders.map((Order: any) => (
                        <tr className="cart-table-content" key={Order.OrderId}>
                          <td className="cart-table-image-info">
                            <img
                              src={Order.image}
                              alt="Product Image"
                              style={{ height: "100px", width: "100px" }}
                            />
                          </td>
                          <td className="bold-text">{Order.name}</td>
                          <td>{Order.category}</td>
                          <td>${Order.price}</td>
                          <td>
                            {
                              <img
                                src={deletesvg}
                                alt="delete"
                                onClick={() => deleteOrder(Order.OrderId)}
                                style={{
                                  height: "30px",
                                  width: "30px",
                                  cursor: "pointer",
                                }}
                              />
                            }
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="cart-empty-message">
                          No products in the cart.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="cart-table-bill">
                <div className="bill-total bold-text">${cartData.total}</div>
              </div>
              <div className="cart-header-footer">
                <button
                  className="cart-header-cta red-bg"
                  type="button"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
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

export default Cart;
