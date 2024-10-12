import React, { Component } from "react";
import "./index.css";
let product = {
  rating: 2,
};
export class Singleproduct extends Component {
  render() {
    return (
      <div className="singlecart">
        <img
          src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
          alt="alttext"
          className="singlecartimg"
        />
        <div className="contentdiv">
          <div className="namediv">
            <p className="productname">product nameeeeeeeeeeeeeee</p>
            <p>product catogory</p>
          </div>
          <div className="procediv">
            <p>120$</p>
            <div class="stars">
              <div class="empty-stars">&#9734;&#9734;&#9734;&#9734;&#9734;</div>

              <div
                class="filled-stars"
                style={{ width: `${(product.rating / 5) * 100}%` }}
              >
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Singleproduct;
