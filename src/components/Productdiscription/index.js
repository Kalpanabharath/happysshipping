import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

class Discription extends Component {
  state = {
    product: null, // State to hold product data
    loading: true, // Loading state
    error: null, // Error state
    isfav: false,
  };

  componentDidMount() {
    const { id } = this.props; // Accessing id from props
    this.fetchProductData(id); // Fetch product data based on id
  }
  changefav = () => {
    this.setState((prevState) => ({ isfav: !prevState.isfav }));
  };
  fetchProductData = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`); // Replace with your API URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const product = await response.json();
      this.setState({ product, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { product, loading, error, isfav } = this.state;

    if (loading) {
      return <p>Loading...</p>; // Loading message
    }

    if (error) {
      return <p>Error: {error}</p>; // Error message
    }

    return (
      <div>
        {product ? (
          <div className="discription">
            {isfav ? (
              <FaHeart className="hearticon" onClick={this.changefav} />
            ) : (
              <FaRegHeart className="hearticon" onClick={this.changefav} />
            )}

            <img
              src={product.image}
              alt="productimage"
              className="product-image"
            />
            <div className="titlcatagory">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-category">{product.category}</p>
            </div>
            <div className="procerating">
              <p className="product-price">Price: ${product.price}</p>
              <div className="star-rating">
                <div className="empty-star-rating">
                  &#9734;&#9734;&#9734;&#9734;&#9734;
                </div>

                <div
                  className="filled-star-rating"
                  style={{ width: `${(product.rating.rate / 5) * 100}%` }}
                >
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
              </div>
            </div>
            <p className="product-description">
              Description: {product.description}
            </p>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    );
  }
}

const Productdiscription = () => {
  const { id } = useParams(); // Using useParams to get the id
  return (
    <div>
      <Discription id={id} />
      {/* Passing id as a prop to the class component */}
    </div>
  );
};

export default Productdiscription;
