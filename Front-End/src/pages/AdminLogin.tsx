import { Fragment, useState } from "react";
import "../Style/AdminLogin.css";
import Alert from "../component/Alert";
import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); // Store new password for reset
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] = useState(false); // New dialog for password reset
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setAlert({
        title: "Error",
        message: "Please enter your email to reset your password.",
        isSuccess: false,
      });
      setIsDialogOpen(true);
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
      setIsDialogOpen(true);
    } catch (error: any) {
      console.error("Error during forgot password request:", error);

      setAlert({
        title: "Error",
        message: error.response?.data?.message || "An error occurred.",
        isSuccess: false,
      });
      setIsDialogOpen(true);
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
        setIsDialogOpen(true);

        setTimeout(() => {
          window.location.href = "/admin/home";
        }, 1500);
      } else {
        setAlert({
          title: "Error",
          message: data.message || "Password or email not correct.",
          isSuccess: false,
        });
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);

      setAlert({
        title: "Error",
        message: "An error occurred while logging in. Please try again.",
        isSuccess: false,
      });
      setIsDialogOpen(true);
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
        setIsDialogOpen(true);

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
      <div className="bg-img">
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
      </div>

      {/* Default alert dialog */}
      {alert && (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogContent>
            <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Password reset dialog */}
      <Dialog
        open={isPasswordResetDialogOpen}
        onClose={() => setIsPasswordResetDialogOpen(false)}
        sx={{
          "& .MuiDialog-paper": {
            padding: "20px",
            borderRadius: "10px",
            width: "400px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogContent>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Reset Password
          </h3>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginBottom: "20px",
              padding: "10px",
            }}
          />
        </DialogContent>
        <DialogActions>
  
          <Button
            onClick={handlePasswordReset}
            sx={{
              textTransform: "none",
              fontWeight: "500",
              color: "#fff",
              background: "-webkit-linear-gradient(left, #a445b2, #fa4299)",
              "&:hover": {
                backgroundColor: "#fa4299",
              },
            }}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AdminLogin;
