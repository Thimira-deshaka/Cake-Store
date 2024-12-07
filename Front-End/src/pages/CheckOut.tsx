import { Fragment, useState, useEffect } from "react";
import "../Style/CheckOut.css";
import axios from "axios";

function CheckOut() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [orderId, setOrderId] = useState(localStorage.getItem("OrderId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const ordersData = localStorage.getItem("Orders");
  const total = localStorage.getItem("total");

 console.log(orderId);
 console.log(userId);
 console.log(cartItems);
 console.log(token);
  useEffect(() => {
   
    
    if (!token) {
      window.location.href = "/login";
    } else {
      // Fetch cart items or perform necessary actions
      axios
        .get("http://localhost:3003/cart", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setCartItems(response.data.items);
        })
        .catch((error) => {
          console.error("Error fetching cart items", error);
        });
    }
  }, [token]);

  const submitHandler = async () => {
    try {
      // Ensure ordersData is not null or undefined
      if (!ordersData) {
        alert("No orders found!");
        return;
      }
  
      // Parse the orders from localStorage
      const orders = JSON.parse(ordersData);
      console.log("Orders:", ordersData);
      console.log("total:", total); // Ensure this matches the actual property name in your order object
  
      if (!Array.isArray(orders)) {
        console.error("Orders data is not an array", orders);
        alert("Invalid orders data.");
        return;
      }
  
      if (orders.length === 0) {
        alert("No orders found!");
        return;
      }
  
      // Iterate over each order and send a request for each orderId
      for (const order of orders) {
        const orderId = order.OrderId; // Ensure this matches the actual property name in your order object
        if (!orderId) {
          console.error("OrderId is undefined for order:", order);
          continue;
        }
        console.log("Processing orderId:", orderId);
  
        const response = await fetch(`http://localhost:3003/cart/proceed/${orderId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
  
        if (response.ok) {
          console.log(`Order ${orderId} processed successfully.`);
        } else {
          console.error(`Failed to process order ${orderId}`);
        }
      }
  
      alert("All orders have been processed successfully!");
      window.location.href = "/";
  
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred while processing your checkout. Please try again later.");
    }
  };
  


  return (
    <Fragment>
      <div className="wrapper">
        <div className="spaceto">
          <div className="containers">
            <div className="title">Checkout Form</div>

            <div className="input-form">
              <div className="section-1">
                <div className="items">
                  <label className="label">Card Number</label>
                  <input
                    type="text"
                    className="input"
                    maxLength={19}
                    data-mask="0000 0000 0000 0000"
                    placeholder="1234 1234 1234 1234"
                  />
                </div>
              </div>

              <div className="section-2">
                <div className="items">
                  <label className="label">Card Holder</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Coding Market"
                  />
                </div>
              </div>

              <div className="section-3">
                <div className="items">
                  <label className="label">Expire Date</label>
                  <input
                    type="text"
                    className="input"
                    data-mask="00 / 00"
                    placeholder="MM / YY"
                  />
                </div>
                <div className="items">
                  <div className="cvc">
                    <label className="label">CVC Code</label>
                    <div className="tooltip">
                      ?
                      <div className="cvc-img">
                        <img src="https://i.imgur.com/r8oXtry.png" alt="CVC Info" />
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="input"
                    data-mask="0000"
                    placeholder="0000"
                  />
                </div>
              </div>
            </div>

            <div className="bat" onClick={submitHandler}>
              Proceed 
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CheckOut;
