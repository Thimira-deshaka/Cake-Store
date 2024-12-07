import React, { Fragment, useEffect, useState } from "react";
import "../Style/AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";

interface Order {
  id: string; // Unique order ID
  productImage: string; // Product image URL
  productId: string; // Product ID
  productName: string; // Product name
  date: string; // Order date
  quantity: number; // Quantity of product ordered
  customerName: string; // Customer's name
  status: "Accepted" | "Ready" | "Pickup" | "Delivery Done"; // Updated statuses
}

function AdminHome () {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3004/admin/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jsonData: Order[] = await response.json();
        setOrders(jsonData);
        console.log("Fetched Orders:", jsonData);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Change row hover behavior
  const handleMouseEnter = (id: string) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  // Handle status change and update on the server
  const handleStatusChange = async (
    id: string,
    newStatus: "Accepted" | "Ready" | "Pickup" | "Delivery Done"
  ) => {
    if (window.confirm("Are you sure you want to change the order status?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3004/admin/orders/status`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId: id, newStatus }),
          }
        );

        if (response.ok) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === id ? { ...order, status: newStatus } : order
            )
          );
          alert("Order status updated successfully!");
        } else {
          console.error("Failed to update order status");
        }
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  // Handle navigation to product info
  const handleLinkClick = (productID: string) => {
    localStorage.setItem("productID", productID);
    window.location.href = `/productinfo/${productID}`;
  };

  return (
    <Fragment>
      <div
        className="wid"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="page-content"
                style={{ marginTop: "10px", backgroundColor: "#1e1e1e" }}
              >
                <div
                  className="container mt-4 pb-5"
                  style={{
                    backgroundColor: "#1f2122",
                    borderRadius: "5%",
                  }}
                >
                  <h2
                    className="mb-4 pt-4 text-center"
                    style={{ color: "#ffcf86" }}
                  >
                    Your Orders
                  </h2>
                  <table className="table table-bordered text-center align-middle text-white">
                    <thead className="thead-light">
                      <tr>
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Customer Name</th>
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
                              hoveredRow === order.id
                                ? "#ff7eb3"
                                : "inherit", // Change text color on hover
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
                              <span>{order.productId}</span>
                            </div>
                          </td>
                          <td>{order.productName}</td>
                          <td>{order.date}</td>
                          <td>{order.quantity}</td>
                          <td>{order.customerName}</td>
                          <td>
                            <select
                              className={`form-select ${
                                order.status === "Accepted"
                                  ? "bg-primary text-white"
                                  : order.status === "Ready"
                                  ? "bg-warning text-white"
                                  : order.status === "Pickup"
                                  ? "bg-info text-white"
                                  : "bg-success text-white"
                              }`}
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.id,
                                  e.target
                                    .value as "Accepted" | "Ready" | "Pickup" | "Delivery Done"
                                )
                              }
                            >
                              <option value="Accepted">Accepted</option>
                              <option value="Ready">Ready</option>
                              <option value="Pickup">Pickup</option>
                              <option value="Delivery Done">
                                Delivery Done
                              </option>
                            </select>
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

export default AdminHome;
