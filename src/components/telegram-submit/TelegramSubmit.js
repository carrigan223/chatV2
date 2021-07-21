import React from "react";
import Telegram from "../../../src/telegram.png";
import "./TelegramSubmit.styles.css";

const TelegramSubmit = () => {
  return (
    <button className="submit-container">
      <img src={Telegram} alt="user logo" className="submit-logo" />
    </button>
  );
};

export default TelegramSubmit;
