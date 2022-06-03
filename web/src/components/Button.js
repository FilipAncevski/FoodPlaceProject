import React from "react";

export const Button = ({ buttonType, usageFor }) => {
  return (
    <div className="button-container">
      <button className={buttonType}>{usageFor}</button>
    </div>
  );
};
