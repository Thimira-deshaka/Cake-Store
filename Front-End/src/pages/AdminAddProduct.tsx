import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavBar from "../component/AdminNavBar";
import photo6 from '../assets/photo6.jpg';
import Alert from "../component/Alert"; // Import Alert component

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

  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null); // State for alerts

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

    // Check if any input field is empty
    if (
      !inputValue.name ||
      !inputValue.description ||
      !inputValue.price ||
      !inputValue.quantity ||
      !inputValue.category ||
      !inputValue.image
    ) {
      setAlert({
        title: "Error",
        message: "All fields are required. Please fill in all fields.",
        isSuccess: false,
      });
      setTimeout(() => setAlert(null), 3000); 
      return; 
    }

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
      const response = await fetch("http://localhost:3004/admin/addproduct", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setAlert({
          title: "Success",
          message: "Product added successfully!",
          isSuccess: true,
        });
        setTimeout(() => setAlert(null), 3000); 
        navigate("/admin/products"); 
      } else {
        setAlert({
          title: "Error",
          message: "Failed to add product. Please try again.",
          isSuccess: false,
        });
        setTimeout(() => setAlert(null), 3000); 
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        title: "Error",
        message: "An error occurred while adding the product.",
        isSuccess: false,
      });
      setTimeout(() => setAlert(null), 3000); 
    }
  };

  return (
    <Fragment>
      <AdminNavBar />
      <div
        className="container-fluid"
        style={{
          width: "100%",
          padding: "0",
          margin: "0",
          height: "100%",
        }}
      >
        <div
          className="widt"
          style={{
            backgroundImage: `url(${photo6})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "0",
            margin: "0",
            height: "97.5vh",
          }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="main-profile"
                    style={{
                      borderRadius: "5px",
                      width: "63%",
                      height: "80%",
                      margin: "auto",
                      padding: "30px",
                      marginTop: "150px",
                      boxShadow: "-1px 4px 28px 0px rgba(0, 0, 0, 0.75)",
                    }}
                  >
                    <div className="row">
                      <div
                        className="col-lg-4"
                        style={{
                          marginTop: "75px",
                        }}
                      >
                        <div
                          className="drag-and-drop"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          style={{
                            border: "1px dashed gray",
                            padding: "50px",
                            textAlign: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderRadius: "25px",
                            marginBottom: "20px",
                            marginTop: "-75px",
                            height: "30vh",
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
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            border: "1px solid gray",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <form onSubmit={handleSubmit}>
                          <input
                            type="text"
                            name="name"
                            value={inputValue.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="form-control mb-2"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.5)",
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
                              backgroundColor: "rgba(255, 255, 255, 0.5)",
                              border: "1px solid gray",
                              borderRadius: "5px",
                            }}
                          ></textarea>
                        </form>
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
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
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
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
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
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                border: "1px solid gray",
                                borderRadius: "5px",
                              }}
                            />
                          </li>
                        </ul>
                        <button
                          className="searchButton"
                          type="submit"
                          style={{
                            padding: "5px 20px",
                            fontSize: "20px",
                            background:
                              "-webkit-linear-gradient(left, #a445b2, #fa4299)",
                            color: "white",
                            border: "none",
                            borderRadius: "40px",
                            zIndex: 9999, // Ensure the button is on top
                          }}
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {alert && (
        <div style={{position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000, }}>
          <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
        </div>
      )}
        </div>
      </div>
    </Fragment>
  );
}

export default AdminAddProduct;
