import React, { Component } from "react";

import "./index.css";

export class Login extends Component {
  render() {
    return (
      <div className="loginpage">
        <div className="imagediv">
          <img
            src="https://www.clipartmax.com/png/middle/296-2961119_logo-happy-shopping-logo-png.png"
            alt="Login page illustration"
          />
        </div>
        <div className="form">
          <h3>Login form</h3>
          <form>
            <div className="namediv">
              <label>Name</label>
              <input type="text" />
            </div>
            <div className="emailid">
              <label>Email</label>
              <input type="password" />
            </div>
            <button className="custom-btn btn-6">
              <span>Read More</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
