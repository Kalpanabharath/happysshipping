import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Productedroute = ({ element: Component }) => {
  // Check if JWT token exists in cookies
  const jwttoken = Cookies.get("jwt-token");

  // If token exists, render the component; otherwise, redirect to the Login page
  return jwttoken ? <Component /> : <Navigate to="/Login" />;
};

export default Productedroute;
