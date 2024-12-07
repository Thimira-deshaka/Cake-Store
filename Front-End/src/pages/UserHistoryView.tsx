import React, { Fragment, useEffect, useState } from "react";
import "../Style/UserHistoryView.css"; // Add your CSS file for styling
import NavBar from "../component/NavBar";

interface Order {
  id: number;
  productImage: string;
  productId: string;
  productName: string;
  date: string;
  quantity: number;
  status: "On Going" | "Shipped" | "Delivered";
}

const UserOrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3001/orders/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <Fragment>
    <NavBar />
    <div className="container"
    style={{
        marginTop: "100px",
        marginBottom: "50px",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
    }}>
      <h2>Order History</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <img src={order.productImage} alt={order.productName} width="50" />
              </td>
              <td>{order.productName}</td>
              <td>{order.date}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Fragment>
  );
};

export default UserOrderHistory;