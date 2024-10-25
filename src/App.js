import "./App.css";
import { Component } from "react";
import Header from "./components/Header";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Notfound from "./components/Notfound";
import Login from "./components/Login";
import Productedroute from "./components/Productedroute";
import Productdiscription from "./components/Productdiscription";
import Cookies from "js-cookie";
import Logincontext from "./context/Logincontext";

class App extends Component {
  state = {
    userlogin: false,
    mycart: [],
    myfav: [],
  };

  userloginchange = (val) => {
    this.setState({ userlogin: val });
  };
  myfavadd = (product) => {
    this.setState((prevState) => {
      // Check if the product is already in favorites
      const isProductInFav = prevState.myfav.some(
        (item) => item.id === product.id
      );
      if (isProductInFav) {
        return null; // Do nothing if it's already in favorites
      }
      return {
        myfav: [...prevState.myfav, product], // Add to favorites if not already there
      };
    });
  };

  myfavremove = (id) => {
    this.setState((prevState) => ({
      myfav: prevState.myfav.filter((item) => id !== item.id),
    }));
  };

  addproduct = (product) => {
    this.setState((prevState) => {
      const existingProduct = prevState.mycart.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        // Update the count of the product in the cart
        const updatedCart = prevState.mycart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
        return { mycart: updatedCart };
      } else {
        // Add the product to the cart with an initial count of 1
        return { mycart: [...prevState.mycart, { ...product, count: 1 }] };
      }
    });
  };

  removeproduct = (id) => {
    this.setState((prevState) => {
      const existingProduct = prevState.mycart.find((item) => item.id === id);
      if (existingProduct.count === 1) {
        // If the count is 1, remove the product from the cart
        return {
          mycart: prevState.mycart.filter((item) => item.id !== id),
        };
      } else {
        // Decrease the count of the product in the cart
        const updatedCart = prevState.mycart.map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        );
        return { mycart: updatedCart };
      }
    });
  };

  componentDidMount() {
    const jwtToken = Cookies.get("jwt-token");
    if (jwtToken) {
      this.setState({ userlogin: true });
    }
  }

  render() {
    const { userlogin, mycart, myfav } = this.state;

    return (
      <Logincontext.Provider
        value={{
          userlogin,
          changelogin: this.userloginchange,
          mycart,
          addproduct: this.addproduct,
          removeproduct: this.removeproduct,
          myfav,
          myfavadd: this.myfavadd,
          myfavremove: this.myfavremove,
        }}
      >
        <div>
          <Header />

          <Routes>
            <Route path="/" element={<Productedroute element={Home} />} />
            <Route path="/HappysShipping" element={<Navigate to="/" />} />
            <Route
              path="/Product"
              element={<Productedroute element={Product} />}
            />
            <Route path="/Cart" element={<Productedroute element={Cart} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/product/:id" element={<Productdiscription />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Logincontext.Provider>
    );
  }
}

export default App;
