import { Fragment, useState } from "react";
import "../Style/Login.css";
import Alert from "../component/Alert";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        alert("Log in successfuly.");
        // console.log("Login successful");
        // window.location.href = "/";
        response.json().then((data) => {
          console.log(data);
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.role));
          window.location.href = "/";
        });
      } else {
        alert("password or email not correct");
        window.location.href = "/login";
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
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
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Login;
