import React from "react";
import Grapefruit from "../../../src/GRAPFRUIT-LOGO.png";
import "./GrapefruitLogo.styles.css";

const GrapefruitLogo = () => {
  return (
    <div className="grapefruit-container">
      <img src={Grapefruit} alt="grapefruit logo" className="grapefruit-logo" />
    </div>
  );
};

export default GrapefruitLogo;
