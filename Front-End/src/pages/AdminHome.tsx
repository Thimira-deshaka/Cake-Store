import React, { Fragment, useEffect, useState } from "react";
import "../Style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";

interface Order {
  id: number;
  productImage: string;
  productId: string;
  ProductNanme: string;
  date: string;
  quantity: number;
  customerName: string;
  status: "On Going" | "Shipped";
}

const Home: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      productImage:
        "https://cdn.giftstoindia24x7.com/ASP_Img/IMG2000/GTI443307.jpg",
      productId: "P001",
      ProductNanme: "Chocolate Cake 1",
      date: "2024.11.11",
      quantity: 1,
      customerName: "Cody Fisher",
      status: "On Going",
    },
    {
      id: 2,
      productImage:
        "https://www.cakestoindia.com/wp-content/uploads/2021/12/802.png",
      productId: "P002",
      ProductNanme: "Chocolate Cake 2",
      date: "2024.11.30",
      quantity: 2,
      customerName: "Kristin Watson",
      status: "Shipped",
    },
    {
      id: 3,
      productImage:
        "https://i.pinimg.com/474x/71/7f/2a/717f2af577fa853a44fa255c09c72a2b.jpg",
      productId: "P003",
      ProductNanme: "Chocolate Cake 3",
      date: "2024.11.20",
      quantity: 12,
      customerName: "Esther Howard",
      status: "Shipped",
    },
  ]);

  //these are for change the color of rows when hover
  const handleMouseEnter = (id: number) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  // Handle status change with confirmation
  const handleStatusChange = (
    id: number,
    newStatus: "On Going" | "Shipped"
  ) => {
    if (window.confirm("Are you sure you want to change the order status?")) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3002/products", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const jsonData = await response.json();
  //       setData(jsonData);
  //     } else {
  //       console.log("Failed to fetch products");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleLinkClick = (productID: any) => {
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
              <div className="page-content" style={{ marginTop: "150px" }}>
                <div className="container mt-4 pb-5">
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
                              hoveredRow === order.id ? "#ffcf86" : "inherit", // Change text color on hover
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
                          <td>{order.ProductNanme}</td>
                          <td>{order.date}</td>
                          <td>{order.quantity}</td>
                          <td>{order.customerName}</td>
                          <td>
                            <select
                              className={`form-select ${
                                order.status === "On Going"
                                  ? "bg-primary text-white"
                                  : "bg-success text-white"
                              }`}
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.id,
                                  e.target.value as "On Going" | "Shipped"
                                )
                              }
                            >
                              <option value="On Going">On Going</option>
                              <option value="Shipped">Shipped</option>
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

export default Home;
