import { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiXMark } from "react-icons/hi2";

import "./index.css";

class Header extends Component {
  state = { userlogin: false, openmobleview: false };
  changeopenmobile = () => {
    this.setState((prev) => ({ openmobleview: !prev.openmobleview }));
  };
  closemobileview = () => {
    this.setState((prev) => ({ openmobleview: false }));
  };

  render() {
    let { userlogin, openmobleview } = this.state;
    let navclass = openmobleview ? "navlistmobile" : "navlist";
    return (
      <div className="header">
        <div className="logo">
          <img src="../happy Shopping.png" alt=" Logo" className="logoimg" />
        </div>
        <div className="navigation">
          <ul className={navclass}>
            <li onClick={this.closemobileview}>Home</li>
            <li onClick={this.closemobileview}>product</li>
            <li onClick={this.closemobileview}>Cart</li>
          </ul>
          {userlogin ? <button>Log Out </button> : <button> Login</button>}
          {openmobleview ? (
            <HiXMark className="HiXMark" onClick={this.changeopenmobile} />
          ) : (
            <GiHamburgerMenu
              className="GiHamburgerMenu"
              onClick={this.changeopenmobile}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Header;
