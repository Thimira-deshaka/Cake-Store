import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavBar from "../component/AdminNavBar";


function AdminAddProduct() {
  const [inputValue, setInputValue] = useState<{
    name: string;
    description: string;
    price: string;
    quantity: string;
    category: string;
    image: File | null;
  }>({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setInputValue({ ...inputValue, image: event.target.files[0] });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setInputValue({ ...inputValue, image: event.dataTransfer.files[0] });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", inputValue.name);
    formData.append("description", inputValue.description);
    formData.append("price", inputValue.price);
    formData.append("quantity", inputValue.quantity);
    formData.append("category", inputValue.category);
    if (inputValue.image) {
      formData.append("image", inputValue.image);
    }

    try {
      const response = await fetch("http://localhost:3002/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/admin/products"); // Navigate to the products page after adding the product
      } else {
        console.log("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <div className="container-fluid"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent effect
        padding: "0",
        margin: "0",
        height: "100%",
      }}>
      <AdminNavBar />
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile"
                  style={{
                    // backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent effect
                    borderRadius: "5px",
                    width: "63%",
                    height: "100%",
                    margin: "auto",
                    padding: "20px",
                    marginTop: "50px",
                  }}
                  >
                    <div className="row">
                      <div className="col-lg-4"
                      style={{
                        marginTop: "75px",
                      }}>
                        <div
                          className="drag-and-drop"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          style={{
                            border: "2px dashed gray",
                            padding: "40px",
                            textAlign: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                        >
                          {inputValue.image ? (
                            <img
                              src={URL.createObjectURL(inputValue.image)}
                              alt="Product"
                              className="img-fluid"
                            />
                          ) : (
                            <p>Drag & Drop Product Image Here</p>
                          )}
                        </div>
                        <input
                          type="file"
                          name="image"
                          onChange={handleImageChange}
                          className="form-control"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent effect
                            border: "1px solid gray",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <form onSubmit={handleSubmit}>
                            <input
                              type="text"
                              name="name"
                              value={inputValue.name}
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
                              value={inputValue.description}
                              onChange={handleInputChange}
                              placeholder="Description"
                              className="form-control mb-2"
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent effect
                                border: "1px solid gray",
                                borderRadius: "5px",
                              }}
                            ></textarea>
                            <div className="main-button">
                              <button
                                className="searchButton"
                                type="submit"
                                style={{
                                  padding: "5px 20px",
                                  fontSize: "20px",
                                  backgroundColor: "rgba(0, 128, 0, 0.5)",
                                  color: "white",
                                  borderRadius: "5px",
                                  marginTop: "60px",
                                }}
                              >
                                Add Product
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Category:{" "}
                            <input
                              type="text"
                              name="category"
                              value={inputValue.category}
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
                              value={inputValue.price}
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
                              value={inputValue.quantity}
                              onChange={handleInputChange}
                              className="form-control"
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent effect
                                border: "1px solid gray",
                                borderRadius: "5px",
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className="main-button  ">
                              <button
                                className="searchButton"
                                type="submit"
                                style={{
                                  padding: "5px 20px 5px 20px",
                                  fontSize: "20px",
                                  backgroundColor: "rgba(0, 128, 0, 0.5)",
                                  color: "white",
                                  borderRadius: "5px",
                                  marginTop: "60px",
                                  marginLeft: "80%",
                                }}
                              >
                                Add Product
                              </button>
                            </div> */}
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

export default AdminAddProduct;