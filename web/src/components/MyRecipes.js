import React from "react";
import { Button } from "./Button";
import { PlusIcon } from "./PlusIcon";
import { TrashIcon } from "./TrashIcon";
import "../css/MyRecipes.css";

export const MyRecipes = () => {
  return (
    <div className="container">
      <div className="heading-line-container">
        <div className="heading">
          <h1>My Recipes</h1>
        </div>
        <div className="line-container"></div>
        <div className="back-container">
          <PlusIcon />
        </div>
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
                <Button buttonType={"register-btn"} usageFor={"BRUNCH"} />
              </td>
              <td className="flex-1">22.11.2020</td>
              <td className="flex-9">
                <TrashIcon />
              </td>
            </tr>
            <tr>
              <td className="flex-1">Homemade Pizza</td>
              <td className="flex-1">
                <Button buttonType={"register-btn"} usageFor={"BRUNCH"} />
              </td>
              <td className="flex-1">22.11.2020</td>
              <td className="flex-9">
                <TrashIcon />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
