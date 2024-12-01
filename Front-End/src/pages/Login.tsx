import { Fragment, useState } from "react";
import "../Style/Login.css";
import Alert from "../component/Alert";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await axios.post("/api/forgot-password", { email });
      setAlert({
        title: "Success",
        message: response.data.message,
        isSuccess: true,
      });
    } catch (error: any) {
      setAlert({
        title: "Error",
        message: error.response?.data?.message || "An error occurred.",
        isSuccess: false,
      });
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
        setAlert({
          title: "Login Successful",
          message: "You have successfully logged in.",
          isSuccess: true,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => (window.location.href = "/"), 2000);
      } else {
        setAlert({
          title: "Login Failed",
          message: "Password or email is incorrect.",
          isSuccess: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        title: "Error",
        message: "An unexpected error occurred.",
        isSuccess: false,
      });
    }
  }

  return (
    <Fragment>
      <div className="bg-img">
        <div className="content">
          <header>Login Form</header>
          {alert && (
            <Alert
              title={alert.title}
              message={alert.message}
              isSuccess={alert.isSuccess}
            />
          )}
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
            Don't have an account?
            <a href="/register">Signup Now</a>
          </div>
          <div className="signup space">
            <a
              href="#"
              onClick={() => {
                if (email.trim()) {
                  handleForgotPassword(email);
                } else {
                  setAlert({
                    title: "Error",
                    message: "Please enter your email to reset your password.",
                    isSuccess: false,
                  });
                }
              }}
            >
              Forget Password
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
