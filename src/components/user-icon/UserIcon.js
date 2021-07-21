import React from "react";
import UserPng from "../../../src/user.png";
import "./UserIcon.styles.css";

const UserIcon = () => {
  return (
    <div className="user-container">
      <img src={UserPng} alt="user logo" className="user-logo" />
    </div>
  );
};

export default UserIcon;
