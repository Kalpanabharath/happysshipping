import React, { Component } from "react";
import "./index.css";
import Singleproduct from "../Singleproduct";
import { ColorRing } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import Logincontext from "../../context/Logincontext";

export class Product extends Component {
  static contextType = Logincontext;
  state = {
    productarray: [],
    loading: true,
    searchinput: "",
    filteredProducts: [], // To store the filtered products
    categories: [], // To store fetched categories
    selectedCategory: "", // To store the selected category
    sortType: "", // To store the selected sort type
  };

  // Update the search input value
  searchproduct = (event) => {
    this.setState({ searchinput: event.target.value });
  };

  // Perform the search when the button is clicked
  handleSearchClick = () => {
    const { productarray, searchinput } = this.state;
    const filteredProducts = productarray.filter(
      (product) =>
        product.title &&
        product.title.toLowerCase().includes(searchinput.toLowerCase())
    );
    this.setState({ filteredProducts }, this.applySort);
  };

  // Fetching products after the component has been mounted
  componentDidMount() {
    this.fetchProducts();
    this.fetchCategories();
  }

  // Function to fetch products
  fetchProducts = () => {
    const { selectedCategory } = this.state;
    let apiUrl = "https://fakestoreapi.com/products";

    if (selectedCategory) {
      apiUrl += `/category/${selectedCategory}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Add 'favorite' property to each product
        let productwithfavorite = data.map((product) => ({
          ...product,
          favorite: false, // Initialize 'favorite' to false
        }));

        // Update state with the fetched and processed data
        this.setState({
          productarray: productwithfavorite,
          loading: false,
          filteredProducts: productwithfavorite, // Set filtered products to the updated list
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  // Function to fetch categories and save them in state
  fetchCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ categories: data }); // Save categories in state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  // Function to set the clicked category in the state
  setCategory = (event) => {
    const selectedCategory = event.target.innerHTML; // Get the inner HTML of the clicked element
    this.setState({ selectedCategory }, this.fetchProducts); // Set the state and call fetchProducts
  };

  // Function to handle sorting
  handleSortChange = (event) => {
    this.setState({ sortType: event.target.value }, this.applySort);
  };

  // Function to apply sorting based on the selected criteria
  applySort = () => {
    const { filteredProducts, sortType } = this.state;
    let sortedProducts = [...filteredProducts];

    if (sortType === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceHighLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === "rating") {
      sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortType === "titleAZ") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    this.setState({ filteredProducts: sortedProducts });
  };

  changefav = (id) => {
    let { myfavadd, myfavremove, myfav } = this.context;

    // Check if the product is already a favorite
    let isFavorite = myfav.some((favProduct) => favProduct.id === id);

    if (isFavorite) {
      // If it is a favorite, remove it from favorites
      myfavremove(id);
    } else {
      // If it is not a favorite, add it to favorites
      const product = this.state.productarray.find(
        (product) => product.id === id
      );
      myfavadd(product);
    }
  };

  render() {
    const {
      filteredProducts,
      loading,
      searchinput,
      categories,
      selectedCategory,
      sortType,
    } = this.state;

    return (
      <div className="lodercenter">
        {loading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          <div className="productpage">
            <div className="inputandsort">
              <div className="inputandshortig">
                <input
                  type="text"
                  placeholder="Search Here"
                  value={searchinput}
                  onChange={this.searchproduct}
                />
                <FaSearch onClick={this.handleSearchClick} />
              </div>

              <div className="sorting-options">
                <MdOutlineSort className="sorticon" />

                <select value={sortType} onChange={this.handleSortChange}>
                  <option value="">Sort By</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="titleAZ">Title: A-Z</option>
                </select>
              </div>
            </div>

            <div className="productcatogory">
              <div className="categories">
                <h3>Categories</h3>
                <ul>
                  {categories.map((category, index) => (
                    <li key={index} onClick={this.setCategory}>
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="productcontainer">
                {filteredProducts.map((obj, index) => (
                  <Singleproduct
                    key={index}
                    product={obj}
                    changeFavorite={this.changefav}
                    isFavorite={this.context.myfav.some(
                      (favProduct) => favProduct.id === obj.id
                    )} // Pass favorite status
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Product;
