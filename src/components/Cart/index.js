import React, { useContext } from "react";
import Logincontext from "../../context/Logincontext";
import { Link } from "react-router-dom";
import "./index.css"; // Assuming you have styles here

const Cart = () => {
  const { mycart, addproduct, removeproduct, myfav } = useContext(Logincontext);

  const addtocartbtn = (product) => {
    addproduct(product); // Adding the product to the cart
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {mycart.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {mycart.map((product) => (
            <div key={product.id} className="cart-item">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="cart-item-img"
                />
              </Link>

              <div className="cart-item-details">
                <p className="product-title">{product.title}</p>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-price">Price: ${product.price}</p>
              </div>

              {/* Display count and +/- buttons */}
              <div className="cart-item-actions">
                <button
                  className="count-btn"
                  onClick={() => removeproduct(product.id)}
                >
                  -
                </button>
                <span className="count-number">{product.count}</span>
                <button
                  className="count-btn"
                  onClick={() => addproduct(product)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="displaytotal">
        <h4>Total amount</h4>
        <p className="pricecart">
          {mycart
            .reduce((acc, product) => acc + product.count * product.price, 0)
            .toFixed()}
          <span>$</span>
        </p>
      </div>

      {/* My Favorites Section */}
      <div className="myfav">
        <h4>My Favorites</h4>
        {myfav.length > 0 ? (
          <ul className="fav-list">
            {myfav.map((product, index) => (
              <li key={index} className="fav-item">
                <img
                  src={product.image}
                  alt={product.title}
                  className="fav-image"
                />
                <div className="fav-details">
                  <h5 className="fav-title">{product.title}</h5>
                  <p className="fav-price">Price: ${product.price}</p>
                  <p className="fav-rating">
                    Rating: {product.rating.rate} ({product.rating.count})
                  </p>
                  <button
                    className={`add-to-cart-btn ${
                      mycart.some((obj) => obj.id === product.id) ? "added" : ""
                    }`}
                    onClick={() => addtocartbtn(product)}
                  >
                    {mycart.some((obj) => obj.id === product.id)
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
