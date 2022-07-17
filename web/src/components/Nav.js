import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "./Button";
import { Logo } from "./Logo";

import "../css/Nav.css";

export const Nav = () => {
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [isLogged]);

  return (
    <div className="nav">
      <div className="logo-container">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="categories-container">
        <Link to={"/breakfast"}>
          <span className="category">BREAKFAST</span>
        </Link>
        <span className="dot"></span>
        <Link to={"/brunch"}>
          <span className="category">BRUNCH</span>
        </Link>
        <span className="dot"></span>
        <Link to={"/lunch"}>
          <span className="category">LUNCH</span>
        </Link>
        <span className="dot"></span>
        <Link to={"/dinner"}>
          <span className="category">DINNER</span>
        </Link>
      </div>
      {isLogged ? (
        <div className="account-container-logged-in">
          <Link to={"/myrecepies"}>
            <span className="category green">MY RECIPES</span>
          </Link>
          <span className="dot"></span>
          <Link to={"/myprofile"}>
            <span className="category orange">MY PROFILE</span>
          </Link>
          <span className="dot"></span>
          <span onClick={logOut} className="category grey">
            LOG OUT
          </span>
        </div>
      ) : (
        <div className="account-container">
          <Link to="/login">
            <Button usageFor="LOG IN" buttonType="login-btn" />
          </Link>{" "}
          or
          <Link to="/register">
            <Button usageFor="CREATE ACCOUNT" buttonType="register-btn" />
          </Link>
        </div>
      )}
    </div>
  );
};
