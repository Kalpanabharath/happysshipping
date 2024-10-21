import React, { Component } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./index.css";
import { Link } from "react-router-dom";
import Logincontext from "../../context/Logincontext";

export class Singleproduct extends Component {
  static contextType = Logincontext;

  // Toggle favorite status
  changefav = (e) => {
    e.preventDefault();
    const { product, changeFavorite } = this.props;

    // Call the parent's changeFavorite method to toggle favorite status
    changeFavorite(product.id);
  };

  render() {
    const { product, isFavorite } = this.props; // Use isFavorite prop
    const { mycart, addproduct, removeproduct } = this.context;

    // Check if product is in the cart and get the count
    const cartProduct = mycart.find((item) => item.id === product.id);
    const productCount = cartProduct ? cartProduct.count : 0;

    return (
      <div className="singlecart">
        {/* Show filled or empty heart based on favorite status */}
        {isFavorite ? (
          <FaHeart className="unfavicon" onClick={this.changefav} />
        ) : (
          <FaRegHeart className="unfavicon" onClick={this.changefav} />
        )}

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="singlecartimg"
          />
        </Link>

        <div className="contentdiv">
          {/* Product details */}
          <div className="namediv">
            <p className="productname">{product.title}</p>
            <p>{product.category}</p>
          </div>

          <div className="procediv">
            <p>{product.price}$</p>
            <div className="stars">
              <div className="empty-stars">
                &#9734;&#9734;&#9734;&#9734;&#9734;
              </div>
              <div
                className="filled-stars"
                style={{ width: `${(product.rating.rate / 5) * 100}%` }}
              >
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
            </div>
          </div>

          {/* Add to cart or adjust quantity */}
          {productCount === 0 ? (
            <button className="addcart" onClick={() => addproduct(product)}>
              Add to Cart
            </button>
          ) : (
            <div className="product-count-single">
              <button
                className="count-btn-single"
                onClick={() => removeproduct(product.id)}
              >
                -
              </button>
              <span className="count-number-single">{productCount}</span>
              <button
                className="count-btn-single"
                onClick={() => addproduct(product)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Singleproduct;
