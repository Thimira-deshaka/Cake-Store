import React, { Fragment, useEffect, useState } from "react";
import "../Style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import AdminOrderTable from "../component/admin/AdminOrderTable";

function Home() {
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
                <AdminOrderTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
