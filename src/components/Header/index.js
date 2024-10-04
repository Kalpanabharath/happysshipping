import { Component } from "react";
import "./index.css";

class Header extends Component {
  state = { userlogin: false };
  render() {
    let { userlogin } = this.state;
    return (
      <div className="header">
        <div className="logo">
          <img src="../happy Shopping.png" alt=" Logo" className="logoimg" />
        </div>
        <div className="navigation">
          <ul>
            <li>Home</li>
            <li>product</li>
            <li>Cart</li>
          </ul>
          {userlogin ? <button>Log Out </button> : <button> Login</button>}
        </div>
      </div>
    );
  }
}
export default Header;
