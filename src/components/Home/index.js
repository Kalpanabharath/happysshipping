import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-section">
          <div className="hero">
            <h1>Welcome to HappyCart!</h1>
            <h2>Where Shopping Meets Joy!</h2>
            <p>
              At HappyCart, we believe that shopping should be a delightful
              experience. Explore our wide range of products, from the latest
              fashion trends to essential home goods, all curated to bring you
              happiness. Our easy-to-navigate site and exclusive deals ensure
              that you find exactly what you’re looking for—without the hassle!
              Join our community of satisfied shoppers and discover why
              happiness is just a click away.
            </p>
            <a href="/shop" className="cta-button bounceIn">
              <Link to="./Product"> Shop Now!</Link>
            </a>
          </div>
        </div>
        <div className="image-section">
          <img
            src={`${process.env.PUBLIC_URL}/homepageimage.png`}
            alt="My Image"
          />
        </div>
      </div>
    );
  }
}

export default Home;
