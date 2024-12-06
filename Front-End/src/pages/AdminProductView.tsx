import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminproductCard from "../component/AdminproductCard";
import HomeBanner from "../component/HomeBanner";
import AdminNavBar from "../component/AdminNavBar";
import Footer from "../component/Footer";

function Home() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("idle");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3002/products", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.log("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLinkClick = (productID: any) => {
    localStorage.setItem("productID", productID);
    navigate(`/admin/adminproductInfo/${productID}`);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);
    if (selectedCategory === "idle") {
      fetchData();
    } else {
      fetch(`http://localhost:3002/filter/category/${selectedCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to retrieve filtered data from server");
          }
        })
        .then((responseData) => {
          setData(responseData.filteredProducts);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
   };
   const handleAddProductClick = () => {
    navigate("/admin/addproduct"); // Navigate to add product page
  };

  return (
    <Fragment>
      <AdminNavBar />
      <div className="wid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-content">
                <div className="most-popular">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading-section">
                      <button
                          onClick={handleAddProductClick}
                          className="btn"
                          style={{
                            backgroundColor: "#fff",
                            color: "black",
                            fontWeight: "bold",
                            marginBottom: "20px",
                          }}
                          
                          >
                          Add Product
                        </button>
                      </div>
                      <div className="row">
                        {(filteredData.length > 0 ? filteredData : data).map(
                          (product: any) => (
                            <div
                              className="col-lg-3 col-sm-6 pt-5"
                              onClick={() => handleLinkClick(product._id)}
                              style={{ cursor: "pointer" }}
                              key={product._id}
                            >
                              <AdminproductCard
                                name={product.name}
                                price={product.price}
                                imgsrc={product.image}
                                category={product.category}
                              />
                            </div>
                          )
                        )}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
