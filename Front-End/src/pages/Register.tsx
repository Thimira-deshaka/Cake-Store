import "../Style/Register.css";
import { useState } from "react";
import Alert from "../component/Alert";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(""); // Changed to dob for date of birth
  const [phone, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [alert, setAlert] = useState<{ title: string; message: string; isSuccess: boolean } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confpassword) {
      setAlert({
        title: "Error",
        message: "Passwords do not match.",
        isSuccess: false,
      });
      setIsDialogOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName, dob, phone, gender }),
      });

      if (response.ok) {
        setAlert({
          title: "Registration Successful",
          message: "Your account has been created. Please log in.",
          isSuccess: true,
        });
        setIsDialogOpen(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        const data = await response.json();
        setAlert({
          title: "Registration Failed",
          message: data.message || "An error occurred during registration.",
          isSuccess: false,
        });
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        title: "Error",
        message: "An unexpected error occurred. Please try again later.",
        isSuccess: false,
      });
      setIsDialogOpen(true);
    }
  }

  return (
    <div className="bg-img">
      <div className="registerContent">
        <header>Registration Form</header>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h6>First name</h6>
            </div>
            <div className="col">
              <h6>Last name</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="First Name"
                  name="firstName"
                  onChange={(event) => setFirstName(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Last Name"
                  name="lastName"
                  onChange={(event) => setLastName(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Email</h6>
            </div>
            <div className="col">
              <h6>Phone number</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="Email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Phone"
                  name="phone"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Password</h6>
            </div>
            <div className="col">
              <h6>Confirm password</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Confirm password"
                  onChange={(event) => setConfPassword(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Date of Birth</h6>
            </div>
            <div className="col">
              <h6>Gender</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="date"
                  className="form-control"
                  required
                  placeholder="Date of Birth"
                  name="dob"
                  onChange={(event) => setDob(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Gender"
                  name="gender"
                  onChange={(event) => setGender(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="field space">
            <input type="submit" value="Register Now" />
          </div>
        </form>
        <div className="signup space">
          Already have an account?
          <a href="/login">Login</a>
        </div>
      </div>
      {alert && (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogContent>
            <Alert title={alert.title} message={alert.message} isSuccess={alert.isSuccess} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)} color={alert.isSuccess ? "primary" : "error"}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Register;
