import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
let Productedroute = ({ element: Component }) => {
  let jwttoken = Cookies.get("jwt-token");
  return jwttoken ? <Component /> : <Navigate to="/Login" />;
};
export default Productedroute;
