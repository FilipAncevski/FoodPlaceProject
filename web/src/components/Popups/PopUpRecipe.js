import React, { useContext } from "react";
import { RecipeContext } from "../../utils/RecipeContext";

import { Button } from "../Button";
import { Time } from "../Time";
import { Plate } from "../Plate";
import { Star } from "../Star";

export const PopUpRecipe = ({ likeAndUpdate, userId }) => {
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);

  const handleClick = () => {
    setSelectedRecipe("");
  };

  // const id = selectedRecipe._id;

  const likeAndUpdatePopUp = async (e, id) => {
    try {
      await likeAndUpdate(e, id);
      let updatedRecipe = await updateTheRecipeInfo(e, selectedRecipe._id);
      setSelectedRecipe(updatedRecipe);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTheRecipeInfo = async (e, params) => {
    try {
      let res = await fetch(`/api/v1/kitchen/${params}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      return Promise.resolve(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-container">
        <div className="heading">{selectedRecipe.recipeTitle}</div>
        <button className="close-popup" onClick={handleClick}>
          &times;
        </button>
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
              <div
                className="rating-container"
                onClick={(e) => likeAndUpdatePopUp(e, selectedRecipe._id)}
              >
                <Star />
                {selectedRecipe.like}
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
