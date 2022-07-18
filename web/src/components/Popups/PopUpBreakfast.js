import React from "react";

import { Button } from "../Button";
import { Time } from "../Time";
import { Plate } from "../Plate";
import { Star } from "../Star";

export const PopUpBreakfast = ({
  likeAndUpdate,
  selectedBreakfast,
  setSelectedBreakfast,
}) => {
  const handleClick = () => {
    setSelectedBreakfast("");
  };

  const likeAndUpdatePopUp = async (e, id) => {
    try {
      await likeAndUpdate(e, id);
      let updatedRecipe = await updateTheRecipeInfo(e, selectedBreakfast._id);
      setSelectedBreakfast(updatedRecipe);
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
        <div className="heading">{selectedBreakfast.recipeTitle}</div>
        <button className="close-popup" onClick={handleClick}>
          &times;
        </button>
        <div className="content-container">
          <div className="container-left">
            <div className="recipeImage">
              <img
                src={`/api/v1/storage/${selectedBreakfast.picture}`}
                alt=""
              />
            </div>
            <div className="serverFor">
              <span>Best Server For</span>
              <Button
                buttonType={"register-btn card"}
                usageFor={selectedBreakfast.category}
              />
            </div>
            <div className="p-container">
              <p>{selectedBreakfast.fabula}</p>
            </div>
            <div className="attributes-container diffrent">
              <div className="time-container">
                <Time />
                {selectedBreakfast.prepTime} min
              </div>
              <div className="person-container">
                <Plate />
                {selectedBreakfast.pplFor}{" "}
                {selectedBreakfast.pplFor > 1 ? "persons" : "person"}
              </div>
              <div
                className="rating-container"
                onClick={(e) => likeAndUpdatePopUp(e, selectedBreakfast._id)}
              >
                <Star />
                {selectedBreakfast.like}
              </div>
            </div>
          </div>
          <div className="container-right">
            <span>Recipe Details</span>
            <p>{selectedBreakfast.recipe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
