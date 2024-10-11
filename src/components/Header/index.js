import { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

class Header extends Component {
  state = { userlogin: false, openmobleview: false };

  changeopenmobile = () => {
    this.setState((prev) => ({ openmobleview: !prev.openmobleview }));
  };

  closemobileview = () => {
    this.setState({ openmobleview: false });
  };

  render() {
    const { openmobleview } = this.state;
    const navclass = openmobleview ? "navlistmobile" : "navlist";
    let jwtToken = Cookies.get("jwt-token");

    return (
      <div className="header">
        <div className="logo">
          <img src="../happy Shopping.png" alt="Logo" className="logoimg" />
        </div>
        <div className="navigation">
          <ul className={navclass}>
            <li onClick={this.closemobileview}>
              <Link to="./" className="nav-link" onClick={this.closemobileview}>
                Home
              </Link>
            </li>
            <li onClick={this.closemobileview}>
              <Link
                to="./Product"
                className="nav-link"
                onClick={this.closemobileview}
              >
                Product
              </Link>
            </li>
            <li onClick={this.closemobileview}>
              <Link
                to="./Cart"
                className="nav-link"
                onClick={this.closemobileview}
              >
                Cart
              </Link>
            </li>
          </ul>

          {jwtToken !== undefined ? (
            <Link to="../Login">
              <button>Login</button>
            </Link>
          ) : (
            <button>Log Out</button>
          )}
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
