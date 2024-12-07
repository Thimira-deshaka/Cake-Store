import { Fragment, useState, useEffect } from "react";
import "../Style/CheckOut.css";
import Alert from "../component/Alert"; // Assuming Alert is a reusable component

function CheckOut() {
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const token = localStorage.getItem("token");

  const submitHandler = async () => {
    setIsProcessing(true);

    if (!token) {
      setAlert({
        title: "Error",
        message: "You need to be logged in to complete the checkout.",
        isSuccess: false,
      });
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3003/cart/checkout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAlert({
          title: "Success",
          message: "Your order has been placed successfully!",
          isSuccess: true,
        });

        // Redirect after success
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setAlert({
          title: "Error",
          message: "An error occurred while placing your order. Please try again.",
          isSuccess: false,
        });
      }
    } catch (error) {
      setAlert({
        title: "Error",
        message: "An unexpected error occurred. Please try again.",
        isSuccess: false,
      });
    }

    setIsProcessing(false);
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
                  <label className="label">Card number</label>
                  <input
                    type="text"
                    className="input"
                    maxLength={16}
                    data-mask="0000 0000 0000 0000"
                    placeholder="1234 1234 1234 1234"
                  />
                </div>
              </div>
              <div className="section-2">
                <div className="items">
                  <label className="label">Card holder</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Coding Market"
                  />
                </div>
              </div>
              <div className="section-3">
                <div className="items">
                  <label className="label">Expire date</label>
                  <input
                    type="text"
                    className="input"
                    data-mask="00 / 00"
                    placeholder="MM / YY"
                  />
                </div>
                <div className="items">
                  <div className="cvc">
                    <label className="label">CVC code</label>
                    <div className="tooltip">
                      ?
                      <div className="cvc-img">
                        <img src="https://i.imgur.com/r8oXtry.png" alt="" />
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
              {isProcessing ? "Processing..." : "Proceed"}
            </div>
          </div>
        </div>
      </div>

      {/* Show Alert */}
      {alert && (
        <div style={{ position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,}}>
          <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
        </div>
      )}
    </Fragment>
  );
}

export default CheckOut;
