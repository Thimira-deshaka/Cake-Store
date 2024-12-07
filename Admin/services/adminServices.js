const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");

const loginAdmin = async (email, password) => {
  const user = await adminModel.findOne({ email });
  
  if (user && user.isFirstTimeLogin) {
    // If it's the first time, return a flag indicating a password reset is needed
    return { firstTimeLogin: true };
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: "admin",
        },
      },
      process.env.ACCESS_TOKEN
    );

    return { accessToken, firstTimeLogin: false };
  }
  return null;
};

const addProduct = async (name, description, price, quantity, category, image) => {
  const productData = {name, description, price, quantity, category, image};
  const PRODUCT_SERVER_BASE_URL = process.env.PRODUCT_SERVER_BASE;
  console.log(productData);

    // Send the POST request to the Product Server
    const response = await axios.post(`${PRODUCT_SERVER_BASE_URL}/products`, productData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
}

const resetPasswordAdmin = async (email, newPassword) => {
  try {
    // Find the admin by email
    const user = await adminModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      return { error: "User not found" };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password and set passwordResetRequired to false
    user.password = hashedPassword;
    user.isFirstTimeLogin = false;  // Mark the first-time login as done

    // Save the updated user
    await user.save();

    return { message: "Password reset successfully" };
  } catch (error) {
    return { error: "Internal Server Error", details: error.message };
  }
};

// Fetch product details from the Product server
const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${process.env.PRODUCT_SERVER_BASE}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product details for ID ${productId}:`, error.message);
    throw new Error("Failed to fetch product details.");
  }
};

// Fetch user details from the User server
const fetchUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${process.env.USER_SERVER_BASE}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user details for ID ${userId}:`, error.message);
    throw new Error("Failed to fetch user details.");
  }
};

// Fetch order details from the User server
const fetchOrderDetails = async (userId) => {
  try {
    console.log("this is Admin Service");
    const response = await axios.get(`${process.env.CART_SERVER_BASE}/cart/history`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user details for ID ${userId}:`, error.message);
    throw new Error("Failed to fetch user details.");
  }
};

const getOrderDetails = async () => {
    // Fetch all orders from the OrderHistories table
    const orders = await fetchOrderDetails;

    if (!Array.isArray(orders)) {
      return false;
    }

    // Enrich orders with product and user details
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const product = await fetchProductDetails(order.ProductId);
        const user = await fetchUserDetails(order.UserId);

        return {
          id: order._id,
          quantity: order.Quantity,
          productId: product.id,
          ProductNanme: product.name,
          productImage: product.image,
          status: order.Status,
          customerName: user.name,
        };
      })
    );

    return enrichedOrders;
};

module.exports = {
  loginAdmin,
  resetPasswordAdmin,
  getOrderDetails,
  addProduct,
};
