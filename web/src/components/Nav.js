import React from "react";
import { Button } from "./Button";
import "../css/Nav.css";

export const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-container">
        <img src="./images/logo.png" alt="" />
      </div>
      <div className="categories-container">
        <span className="category">BREAKFAST</span>
        <span className="dot"></span>
        <span className="category">BRUNCH</span>
        <span className="dot"></span>
        <span className="category">LUNCH</span>
        <span className="dot"></span>
        <span className="category">DINNER</span>
      </div>
      <div className="account-container">
        <Button usageFor="LOG IN" buttonType="login-btn" /> or
        <Button usageFor="CREATE ACCOUNT" buttonType="register-btn" />
      </div>
    </div>
  );
};
