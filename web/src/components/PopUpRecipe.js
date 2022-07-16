import React, { useContext } from "react";
import { RecipeContext } from "../utils/RecipeContext";

import { Button } from "./Button";
import { Time } from "./Time";
import { Plate } from "./Plate";
import { Star } from "./Star";

export const PopUpRecipe = () => {
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);

  const handleClick = () => {
    setSelectedRecipe("");
  };

  console.log(selectedRecipe);

  return (
    <div className="popup">
      <button className="close-popup" onClick={handleClick}>
        &times;
      </button>
      <div className="popup-container">
        <div className="heading">{selectedRecipe.recipeTitle}</div>
        <div className="content-container">
          <div className="container-left">
            <div className="recipeImage">
              <img src={`/api/v1/storage/${selectedRecipe.picture}`} alt="" />
            </div>
            <div className="serverFor">
              <span>Best Server For</span>
              <Button
                buttonType={"register-btn card"}
                usageFor={selectedRecipe.category}
              />
            </div>
            <div className="p-container">
              <p>{selectedRecipe.fabula}</p>
            </div>
            <div className="attributes-container diffrent">
              <div className="time-container">
                <Time />
                {selectedRecipe.prepTime} min
              </div>
              <div className="person-container">
                <Plate />
                {selectedRecipe.pplFor}{" "}
                {selectedRecipe.pplFor > 1 ? "persons" : "person"}
              </div>
              <div className="rating-container">
                <Star />
                20
              </div>
            </div>
          </div>
          <div className="container-right">
            <span>Recipe Details</span>
            <p>{selectedRecipe.recipe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
