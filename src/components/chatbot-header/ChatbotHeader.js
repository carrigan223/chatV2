import React from "react";
import Ripemetrics from "../../../src/ripemetric-logo.png";
import "./ChatbotHeader.styles.css";



const ChatbotHeader = () => {
  return (
    <div className="header">
      <div className="logo-image">
        <img src={Ripemetrics} alt="Company logo" />
      </div>
    </div>
  );
};

export default ChatbotHeader;
