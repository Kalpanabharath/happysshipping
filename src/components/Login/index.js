import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { useNavigate, Navigate } from "react-router-dom";
import Logincontext from "../../context/Logincontext";

export class Loginclass extends Component {
  state = { token: "jwttoken", name: "", email: "" };

  // Set contextType to use the Logincontext inside the class
  static contextType = Logincontext;

  formsubmit = (event) => {
    event.preventDefault();

    const { token, name, email } = this.state;

    // Set JWT token and update the userlogin state
    Cookies.set("jwt-token", token, { expires: 100 });

    // Access the context directly using this.context
    const { changelogin } = this.context; // Access context correctly
    changelogin(true);

    // Redirect to homepage after successful login
    this.props.navigate("/");
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }); // Update state based on input name
  };

  render() {
    let jwttoken = Cookies.get("jwt-token");
    if (jwttoken !== undefined) {
      return <Navigate to="/" />;
    }
    return (
      <div className="loginpage">
        <div className="imagediv">
          <img
            src={`${process.env.PUBLIC_URL}/HappyBasketlogo.png`}
            alt="My Image"
          />
        </div>
        <div className="form">
          <h3>Login form</h3>
          <form onSubmit={this.formsubmit}>
            <div className="namediv">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange} // Handle name input change
              />
            </div>
            <div className="emailid">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange} // Handle email input change
              />
            </div>
            <button className="custom-btn btn-6">
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// Functional component to pass the navigate function to the class component
const Login = () => {
  let navigate = useNavigate();
  return <Loginclass navigate={navigate} />;
};

export default Login;
