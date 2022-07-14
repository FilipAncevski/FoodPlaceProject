import React from "react";

export const Button = ({ buttonType, usageFor }) => {
  return <button className={buttonType}>{usageFor}</button>;
};
