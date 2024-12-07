import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useState, useEffect } from "react";
import AdminNavBar from "../component/AdminNavBar";
import Footer from "../component/Footer";

function ProductInfo() {
  const [inputValue, setInputValue] = useState({});
  const [editMode, setEditMode] = useState(false);
  const productID = localStorage.getItem("productID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/products/${productID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setInputValue(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [productID]);

  const handleEditClick = () => {
    setEditMode(!editMode); // Toggle edit mode
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    // Prevent negative values for price and quantity
    if ((name === "price" || name === "quantity") && value < 0) {
      alert(`${name} cannot be negative.`);
      return;
    }

    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3002/products/${productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputValue),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        setEditMode(false); // Exit edit mode after saving
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <AdminNavBar />
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile">
                    <div className="row">
                      <div className="col-lg-4">
                        <img src={inputValue.image} alt="" />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          {editMode ? (
                            <>
                              <input
                                type="text"
                                name="name"
                                value={inputValue.name || ""}
                                onChange={handleInputChange}
                                placeholder="Name"
                                className="form-control mb-2"
                                style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent effect
                                  border: "1px solid gray",
                                  borderRadius: "5px",
                                }}
                              />
                              <textarea
                                name="description"
                                value={inputValue.description || ""}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="form-control mb-2"
                                style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent effect
                                  border: "1px solid gray",
                                  borderRadius: "5px",
                                }}
                              ></textarea>
                            </>
                          ) : (
                            <>
                              <h4>{inputValue.name}</h4>
                              <p>{inputValue.description}</p>
                            </>
                          )}
                          <div className="main-button">
                            {editMode ? (
                              <button
                                className="searchButton"
                                type="button"
                                style={{
                                  padding: "5px 20px",
                                  fontSize: "20px",
                                  backgroundColor: "rgba(0, 128, 0, 0.5)",
                                  color: "white",
                                  borderRadius: "5px",
                                }}
                                onClick={handleSaveClick}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                className="searchButton"
                                type="button"
                                style={{
                                  padding: "5px 20px",
                                  fontSize: "20px",
                                  backgroundColor: "gray",
                                  color: "white",
                                  borderRadius: "5px",
                                }}
                                onClick={handleEditClick}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          {editMode ? (
                            <>
                              <li>
                                Cake Category:{" "}
                                <input
                                  type="text"
                                  name="category"
                                  value={inputValue.category || ""}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent effect
                                    border: "1px solid gray",
                                    borderRadius: "5px",
                                  }}
                                />
                              </li>
                              <li>
                                Price:{" "}
                                <input
                                  type="number"
                                  name="price"
                                  value={inputValue.price || ""}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent effect
                                    border: "1px solid gray",
                                    borderRadius: "5px",
                                  }}
                                />
                              </li>
                              <li>
                                Quantity:{" "}
                                <input
                                  type="number"
                                  name="quantity"
                                  value={inputValue.quantity || ""}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent effect
                                    border: "1px solid gray",
                                    borderRadius: "5px",
                                  }}
                                />
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                Cake Category <span>{inputValue.category}</span>
                              </li>
                              <li>
                                Price <span>{inputValue.price}</span>
                              </li>
                              <li>
                                Quantity <span>{inputValue.quantity}</span>
                              </li>
                            </>
                          )}
                        </ul>
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

export default ProductInfo;
