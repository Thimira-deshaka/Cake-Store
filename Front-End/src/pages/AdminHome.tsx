import React, { Fragment, useEffect, useState } from "react";
import "../Style/AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../component/Alert";
import { useNavigate } from "react-router-dom";


interface Order {
  id: string;
  productImage: string;
  productId: string;
  productName: string;
  date: string;
  quantity: number;
  customerName: string;
  status: "Accepted" | "Ready" | "Pickup" | "Delivery Done";
}

const AdminHome: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);
  const navigate = useNavigate();


  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3003/cart/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setAlert({
            title: "Failed to fetch orders",
            message: "cannot fetch orders",
            isSuccess: false,
          });
          setTimeout(() => {setAlert(null); localStorage.removeItem("token"); navigate("/admin")}, 3000);
          return;
        }

        const jsonData: Order[] = await response.json();
        
        setOrders(jsonData);
      } catch (err: any) {
        console.log(err);
        setError("Error: "+ err);
        setAlert({
          title: "Failed to fetch orders",
          message: err,
          isSuccess: false,
        });
        setTimeout(() => {setAlert(null); localStorage.removeItem("token"); navigate("/admin")}, 3000);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change with server update
  const handleStatusChange = async (
    id: string,
    newStatus: "Accepted" | "Ready" | "Pickup" | "Delivery Done"
  ) => {
    if (!window.confirm("Are you sure you want to change the order status?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3003/cart/orders/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId: id, newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status.");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );

      setAlert({
        title: "Successfull!",
        message: "Order status updated successfully!",
        isSuccess: true,
      });
      setTimeout(() => {setAlert(null); navigate("/admin/home")}, 3000);
      return;
    } catch (err: any) {
      console.log("Error updating order status:", err.message || err);
      setAlert({
        title: "Unsuccessfull!",
        message: "Failed to update order status.",
        isSuccess: false,
      });
      setTimeout(() => {setAlert(null); navigate("/admin/home")}, 3000);
      return;
    }
  };

  // Handle row hover
  const handleMouseEnter = (id: string) => setHoveredRow(id);
  const handleMouseLeave = () => setHoveredRow(null);

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
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-content" style={{ marginTop: "10px", backgroundColor: "#1e1e1e" }}>
                <div className="container mt-4 pb-5" style={{ backgroundColor: "#1f2122", borderRadius: "5%" }}>
                  <h2 className="mb-4 pt-4 text-center" style={{ color: "#ffcf86" }}>
                    Manage Orders
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
                            color: hoveredRow === order.id ? "#ff7eb3" : "inherit",
                          }}
                        >
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              <img
                                src={order.productImage}
                                alt="Product"
                                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                              />
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
                                  ? "bg-secondary text-white"
                                  : order.status === "Ready"
                                  ? "bg-primary text-white"
                                  : order.status === "Pickup"
                                  ? "bg-warning text-white"
                                  : "bg-success text-white"
                              }`}
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.id,
                                  e.target.value as "Accepted" | "Ready" | "Pickup" | "Delivery Done"
                                )
                              }
                            >
                              <option value="Accepted">Accepted</option>
                              <option value="Ready">Ready</option>
                              <option value="Pickup">Pickup</option>
                              <option value="Delivery Done">Delivery Done</option>
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
};

export default AdminHome;
