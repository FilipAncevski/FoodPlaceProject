import React from "react";
import { Link } from "react-router-dom";

import { Button } from "./Button";
import { Logo } from "./Logo";

import "../css/Nav.css";

export const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-container">
        <Link to="/">
          <Logo />
        </Link>
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
        <Link to="/login">
          <Button usageFor="LOG IN" buttonType="login-btn" />
        </Link>{" "}
        or
        <Link to="/register">
          <Button usageFor="CREATE ACCOUNT" buttonType="register-btn" />
        </Link>
      </div>
    </div>
  );
};
