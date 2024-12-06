import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavBar from "../component/AdminNavBar";
import Footer from "../component/Footer";
import "../Style/AddminAddProduct.css";

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
      <AdminNavBar />
      <div className="admin-add-product">
  {/* <AdminNavBar /> */}
  <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-lg-10 bg-dark text-light p-4 rounded shadow mt-6">
        <h2 className="text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-4 mb-3">
              <div
                className="drag-and-drop"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                  border: "2px dashed gray",
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                {inputValue.image ? (
                  <p>{inputValue.image.name}</p>
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
            {/* Middle Column */}
            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="name"
                value={inputValue.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="form-control mb-3"
              />
              <textarea
                name="description"
                value={inputValue.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="form-control mb-3"
              ></textarea>
              <button
                className="btn btn-success w-100"
                type="submit"
              >
                Add Product
              </button>
            </div>
            {/* Right Column */}
            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="category"
                value={inputValue.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="form-control mb-3"
              />
              <input
                type="number"
                name="price"
                value={inputValue.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="form-control mb-3"
              />
              <input
                type="number"
                name="quantity"
                value={inputValue.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="form-control mb-3"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    </Fragment>
  );
}

export default AdminAddProduct;
