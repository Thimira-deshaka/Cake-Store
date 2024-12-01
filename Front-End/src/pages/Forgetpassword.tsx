import "../Style/Login.css";
import { useState } from "react";

function Forgetpassword() {
 
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
}


  return (
    
      <div className="bg-img">
        <div className="content">
          <header>Forget Password Form</header>
          <form onSubmit={handleSubmit}>
            <h4 className="fieldHeader">New Password</h4>
            <div className="field">
              <span className="password"></span>
              <input
                type="password"
                className="pass-key"
                required
                placeholder="Password"
              ></input>
              <span className="show">SHOW</span>
    
            </div>
            <h4 className="fieldHeader space">Confirm Password</h4>
            <div className="field space">
              <span className="password"></span>
              <input
                type="password"
                className="pass-key"
                required
                placeholder="Password"
                

              ></input>
              <span className="show">SHOW</span>
            </div>
            <div className="field space">
              <input type="submit" value="SUBMIT" />
            </div>
          </form>
        
          
        </div>
      </div>
   
  );
}

export default Forgetpassword;
