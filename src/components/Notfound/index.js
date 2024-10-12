import React from "react";
import "./index.css";

const Notfound = () => {
  return (
    <div className="notfound">
      <img
        src={`${process.env.PUBLIC_URL}/notfoundpage.jpg`}
        alt="My Image"
        className="logoimg"
      />
    </div>
  );
};

export default Notfound;
