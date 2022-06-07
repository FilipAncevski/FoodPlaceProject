import React from "react";
import { Button } from "./Button";
import "../css/MyRecipes.css";

export const MyRecipes = () => {
  return (
    <div className="container">
      <div className="heading-line-container">
        <div className="heading">
          <h1>My Recipes</h1>
        </div>
        <div className="line-container"></div>
        <div className="add-container">&#43;</div>
      </div>
      <div className="section-container">
        <table>
          <thead>
            <tr>
              <th className="flex-1">Recipe Name</th>
              <th className="flex-1">Category</th>
              <th className="flex-1">Create On</th>
              <th className="flex-9">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex-1">Homemade Pizza</td>
              <td className="flex-1">
                <Button buttonType={"login-btn"} usageFor={"BRUNCH"} />
              </td>
              <td className="flex-1">22.11.2020</td>
              <td className="flex-9">&#128465;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
