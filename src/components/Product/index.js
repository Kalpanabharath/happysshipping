import React, { Component } from "react";
import "./index.css";
import Singleproduct from "../Singleproduct";

export class Product extends Component {
  state = {
    productarray: [], // Initialize the state
  };

  // Fetching data after the component has been mounted
  componentDidMount() {
    // Example API URL (replace with your own API or data source)
    const apiUrl = "https://fakestoreapi.com/products";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ productarray: data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  render() {
    const { productarray } = this.state;

    return (
      <div className="productpage">
        <Singleproduct />
      </div>
    );
  }
}

export default Product;
