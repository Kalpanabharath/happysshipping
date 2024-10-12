import { createContext } from "react";

// Create the context with default values
const Logincontext = createContext({
  userlogin: false,
  changelogin: () => {},
});

export default Logincontext;
