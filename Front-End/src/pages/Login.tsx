import { Fragment, useState } from "react";
import "../Style/Login.css";
import Alert from "../component/Alert";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle forgot password request
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
      const response = await axios.post("http://localhost:3001/users/forgot-password", { email });
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

  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.role));

        setAlert({
          title: "Success",
          message: "Login successful.",
          isSuccess: true,
        });
        setIsDialogOpen(true);
  
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        const errorData = await response.json();
  
        setAlert({
          title: "Error",
          message: errorData.message || "Password or email not correct.",
          isSuccess: false,
        });
        setIsDialogOpen(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
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
  
  return (
    <Fragment>
      <NavBar />
      <div className="bg-img">
        <div className="content">
          <header>Login Form</header>
          <form onSubmit={handleSubmit}>
            <h4 className="fieldHeader">Email</h4>
            <div className="field">
              <span className="person"> </span>
              <input
                type="text"
                required
                placeholder="Email or Username"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
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
              ></input>
              <span className="show">SHOW</span>
            </div>
            <div className="field space">
              <input type="submit" value="LOGIN" />
            </div>
          </form>
          <div className="signup space">
            Don't have account?
            <a href="/register">Signup Now</a>
          </div>
          <div className="signup space">
            <a onClick={handleForgotPassword}>Forget Password</a>
          </div>
        </div>
      </div>
      
      <Footer />
      {alert && (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogContent>
            <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
          </DialogContent>
          
            <Button onClick={() => setIsDialogOpen(false)} color={alert.isSuccess ? "primary" : "error"}>
              Close
            </Button>
          
        </Dialog>
      )}
    </Fragment>
  );
}

export default Login;
