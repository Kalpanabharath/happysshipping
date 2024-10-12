import "./App.css";
import { Component } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Notfound from "./components/Notfound";
import Login from "./components/Login";
import Productedroute from "./components/Productedroute";

import Cookies from "js-cookie";
import Logincontext from "./context/Logincontext";

class App extends Component {
  state = { userlogin: false };
  userloginchange = (val) => {
    this.setState({ userlogin: val });
  };
  componentDidMount() {
    // Check for JWT token when the component mounts
    const jwtToken = Cookies.get("jwt-token");
    if (jwtToken) {
      this.setState({ userlogin: true });
    }
  }

  render() {
    let { userlogin } = this.state;
    return (
      <Logincontext.Provider
        value={{ userlogin, changelogin: this.userloginchange }}
      >
        <div>
          <Header />

          <Routes>
            <Route path="/" element={<Productedroute element={Home} />} />

            <Route
              path="/Product"
              element={<Productedroute element={Product} />}
            />

            <Route path="/Cart" element={<Productedroute element={Cart} />} />
            <Route path="/Login" element={<Login />} />

            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Logincontext.Provider>
    );
  }
}
export default App;
