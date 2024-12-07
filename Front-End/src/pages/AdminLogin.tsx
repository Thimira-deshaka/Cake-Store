import { Fragment, useState } from "react";
import Alert from "../component/Alert";  // Import the Alert component
import "../Style/Login.css";
import axios from "axios";
import AdminNavBar from "../component/AdminNavBar";
import photo from '../assets/login2.jpg';


function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); // Store new password for reset
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] = useState(false); // New dialog for password reset

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setAlert({
        title: "Error",
        message: "Please enter your email to reset your password.",
        isSuccess: false,
      });
      return;
    }

    try {
      console.log("Requesting password reset for email:", email);
      const response = await axios.post("http://localhost:3004/admin/forgot-password", { email });
      console.log("Response from forgot password:", response);

      setAlert({
        title: "Success",
        message: response.data.message || "Password reset request successful.",
        isSuccess: true,
      });
    } catch (error: any) {
      console.error("Error during forgot password request:", error);

      setAlert({
        title: "Error",
        message: error.response?.data?.message || "An error occurred.",
        isSuccess: false,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1500);
    }
  };

  // Handle login submit
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3004/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.firstTimeLogin) {
        // If it's the first-time login, show the password reset dialog
        setIsPasswordResetDialogOpen(true);
      } else if (response.ok) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.role));

        setAlert({
          title: "Success",
          message: "Login successful.",
          isSuccess: true,
        });

        setTimeout(() => {
          window.location.href = "/admin/home";
        }, 1500);
      } else {
        setAlert({
          title: "Error",
          message: data.message || "Password or email not correct.",
          isSuccess: false,
        });
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);

      setAlert({
        title: "Error",
        message: "An error occurred while logging in. Please try again.",
        isSuccess: false,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1500);
    }
  }

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!newPassword.trim()) {
      setAlert({
        title: "Error",
        message: "Please enter a new password to reset.",
        isSuccess: false,
      });
      return;
    }

    try {
      // Make a request to the backend to reset the password
      const response = await axios.post("http://localhost:3004/admin/reset-password-Admin", {
        email,
        newPassword,
      });

      if (response.status === 200) {
        setAlert({
          title: "Success",
          message: "Password reset successfully.",
          isSuccess: true,
        });

        setIsPasswordResetDialogOpen(false);

        // You can redirect or log the user in again after successful password reset
        setTimeout(() => {
          window.location.href = "/admin/home";
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);

      setAlert({
        title: "Error",
        message: error.response?.data?.message || "An error occurred while resetting the password.",
        isSuccess: false,
      });
    }
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `url(${photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "0",
          margin: "0",
          height: "100vh",
        }}
      >
        <div className="content">
          <header>Admin Login Form</header>
          <form onSubmit={handleSubmit}>
            <h4 className="fieldHeader">Email</h4>
            <div className="field">
              <span className="person"> </span>
              <input
                type="text"
                required
                placeholder="Email or Username"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <h4 className="fieldHeader space">Password</h4>
            <div className="field space">
              <span className="password"></span>
              <input
                type="password"
                className="pass-key"
                required
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <span className="show">SHOW</span>
            </div>
            <div className="field space">
              <input type="submit" value="LOGIN" />
            </div>
          </form>
          <div className="signup space">
            forgot password?
            <a onClick={handleForgotPassword}>Recover password</a>
          </div>
        </div>

        {/* Inline Alert */}
        {alert && (
          <div
            style={{
              position: "fixed",
              top: "15%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
          </div>
        )}
      </div>

      {/* Password reset dialog */}
      {isPasswordResetDialogOpen && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Reset Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handlePasswordReset}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#fa4299",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Reset Password
          </button>
        </div>
      )}
    </Fragment>
  );
}

export default AdminLogin;
