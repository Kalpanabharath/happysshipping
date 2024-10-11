import "./App.css";
import { Component } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Notfound from "./components/Notfound";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    );
  }
}
export default App;
