import React, { Fragment, useEffect, useState } from "react";
import "../Style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Order {
  id: string;
  productImage: string;
  productId: string;
  productName: string;
  date: string;
  quantity: number;
  price: string;
  status: string; // Can be expanded based on backend
}

const UserOrdersView: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); 
        const response = await fetch("http://localhost:3003/cart/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          alert("Failed to fetch orders");
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        console.log(err.message)
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle row hover
  const handleMouseEnter = (id: string) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  // Handle product link click
  const handleLinkClick = (productID: string) => {
    localStorage.setItem("productID", productID);
    window.location.href = `/productinfo/${productID}`;
  };

  // Render loading or error state
  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: "150px" }}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center" style={{ marginTop: "150px", color: "red" }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <Fragment>
      <div
        className="wid"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: "-100px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">

              <div className="page-content" style={{ marginTop: "10px" }}>
                <div
                  className="container mt-4 pb-5"
                  style={{
                    backgroundColor: "#1f2122",
                    borderRadius: "5%",
                  }}
                >
                  <h2
                    className="mb-4 pt-4 text-center"
                    style={{ color: "#ff7eb3" }}
                  >
                    My Orders
                  </h2>
                  <table className="table table-bordered text-center align-middle text-white">
                    <thead className="thead-light">
                      <tr>
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          onMouseEnter={() => handleMouseEnter(order.id)}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            color:
                              hoveredRow === order.id ? "#ffcf86" : "inherit",
                          }}
                        >
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              <img
                                src={order.productImage}
                                alt="Product"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "10px",
                                }}
                              />
                            </div>
                          </td>
                          <td>{order.productName}</td>
                          <td>{order.date}</td>
                          <td>{order.quantity}</td>
                          <td>{`Rs. ${order.price}`}</td>
                          <td> <span className={`text-center align-middle ${
                              order.status === "Accepted"
                                ? "bg-secondary text-white"
                                : order.status === "Ready"
                                ? "bg-primary text-white"
                                : order.status === "Pickup"
                                ? "bg-warning text-white"
                                : "bg-success text-white"
                            }`}
                            style={{ padding: "10px 20px", borderRadius: "8px" }}
                            >{order.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserOrdersView;
