import React from "react";
import "../css/Footer.css";

export const Footer = () => {
  return (
    <div className="container-footer-color">
      <div className="footer-container">
        <div className="logo-footer-container">
          <img src="./images/footer-logo.png" alt="img is broken" />
        </div>
        <div className="categories-footer-container">
          <span className="category-footer">BREAKFAST</span>
          <span className="dot-footer"></span>
          <span className="category-footer">BRUNCH</span>
          <span className="dot-footer"></span>
          <span className="category-footer">LUNCH</span>
          <span className="dot-footer"></span>
          <span className="category-footer">DINNER</span>
        </div>
        <div className="copyrights-container">
          <p>Baby's Food Place</p>
          <p>copyright &copy; 2021</p>
        </div>
      </div>
    </div>
  );
};
