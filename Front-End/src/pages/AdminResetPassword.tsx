import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/Login.css";
import Alert from "../component/Alert";  // Import the Alert component
import axios from "axios";

function AdminResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Extract token from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    setToken(tokenFromUrl);
  }, [location.search]);

  useEffect(() => {
    console.log(token); 
  }, [token]);

  // Handle password reset request
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setAlert({
        title: "Error",
        message: "Passwords do not match.",
        isSuccess: false,
      });
      return;
    }

    if (!token) {
      setAlert({
        title: "Error",
        message: "Invalid or missing reset token.",
        isSuccess: false,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3004/admin/reset-password", {
        token,
        newPassword,
      });

      setAlert({
        title: "Success",
        message: response.data.message || "Password reset successfully.",
        isSuccess: true,
      });

      // Redirect to login page after showing success alert
      setTimeout(() => {
        navigate("/admin");
      }, 2000); 
    } catch (error: any) {
      setAlert({
        title: "Error",
        message: error.response?.data?.message || "An error occurred while resetting password.",
        isSuccess: false,
      });
    }
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Password Reset Form</header>
        <form onSubmit={handleSubmit}>
          <h4 className="fieldHeader">New Password</h4>
          <div className="field">
            <span className="password"></span>
            <input
              type="password"
              className="pass-key"
              required
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span className="show">SHOW</span>
          </div>
          <h4 className="fieldHeader space">Confirm Password</h4>
          <div className="field space">
            <span className="password"></span>
            <input
              type="password"
              className="pass-key"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="show">SHOW</span>
          </div>
          <div className="field space">
            <input type="submit" value="SUBMIT" />
          </div>
        </form>
      </div>

     
      {alert && (
        <div
          style={{
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
        </div>
      )}
    </div>
  );
}

export default AdminResetPassword;
