import { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // Ensure Cookies is imported
import Logincontext from "../../context/Logincontext";
import "./index.css";

class Header extends Component {
  state = { openmobleview: false };
  static contextType = Logincontext;

  changeopenmobile = () => {
    this.setState((prev) => ({ openmobleview: !prev.openmobleview }));
  };

  closemobileview = () => {
    this.setState({ openmobleview: false });
  };

  handleLogout = () => {
    // Remove the JWT token on logout and update the state
    Cookies.remove("jwt-token");
    // You should also call the changelogin function from context to update login state
    const { changelogin } = this.context; // Access context correctly
    changelogin(false);
  };

  render() {
    const { openmobleview } = this.state;
    const navclass = openmobleview ? "navlistmobile" : "navlist";

    return (
      <Logincontext.Consumer>
        {(value) => {
          const { userlogin, changelogin, mycart } = value; // Destructure from context

          return (
            <div className="header">
              <div className="logo ">
                <img
                  src={`${process.env.PUBLIC_URL}/happyShopping.png`}
                  alt="My Image"
                  className="logoimg  tada"
                />
              </div>
              <div className="navigation">
                <ul className={navclass}>
                  <li onClick={this.closemobileview}>
                    <Link to="./" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li onClick={this.closemobileview}>
                    <Link to="./Product" className="nav-link">
                      Product
                    </Link>
                  </li>
                  <li onClick={this.closemobileview}>
                    <Link to="./Cart" className="nav-link  cardnav">
                      Cart
                      <p className="cardcounthead">
                        {mycart.reduce((acc, item) => acc + item.count, 0)}
                      </p>
                    </Link>
                  </li>
                </ul>

                {userlogin ? (
                  <button onClick={this.handleLogout}>Log Out</button>
                ) : (
                  <Link to="../Login">
                    <button>Login</button>
                  </Link>
                )}

                {openmobleview ? (
                  <HiXMark
                    className="HiXMark"
                    onClick={this.changeopenmobile}
                  />
                ) : (
                  <GiHamburgerMenu
                    className="GiHamburgerMenu"
                    onClick={this.changeopenmobile}
                  />
                )}
              </div>
            </div>
          );
        }}
      </Logincontext.Consumer>
    );
  }
}

export default Header;
