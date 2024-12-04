import React, { Fragment, useState } from "react";
import "../../Style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";

interface Order {
  id: number;
  productImage: string;
  productId: string;
  ProductNanme: string;
  date: string;
  quantity: number;
  price: string;
  status: "On Going" | "Shipped";
}

const UserOrdersView: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Handle row hover
  const handleMouseEnter = (id: number) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  // Sample data
  const [orders] = useState<Order[]>([
    {
      id: 1,
      productImage:
        "https://cdn.giftstoindia24x7.com/ASP_Img/IMG2000/GTI443307.jpg",
      productId: "P001",
      ProductNanme: "Chocolate Cake 1",
      date: "2024.11.11",
      quantity: 1,
      price: "1000.00",
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
      price: "2500.00",
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
      price: "3000.00",
      status: "Shipped",
    },
  ]);

  const handleLinkClick = (productID: any) => {
    localStorage.setItem("productID", productID);
    window.location.href = `/productinfo/${productID}`;
  };

  return (
    <Fragment>
      <NavBar />
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
                              <span>{order.productId}</span>
                            </div>
                          </td>
                          <td>{order.ProductNanme}</td>
                          <td>{order.date}</td>
                          <td>{order.quantity}</td>
                          <td>{`Rs. ${order.price}`}</td>
                          <td>{order.status}</td>
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
