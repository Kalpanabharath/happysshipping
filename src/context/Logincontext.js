import { createContext } from "react";

// Create the context with default values
const Logincontext = createContext({
  userlogin: false,
  changelogin: () => {},
  mycart: [],
  addproduct: () => {},
  removeproduct: () => {},
  myfav: [],
  myfavadd: () => {},
  myfavremove: () => {},
});

export default Logincontext;
