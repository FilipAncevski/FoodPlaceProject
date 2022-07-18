import React from "react";

import { Button } from "../Button";
import { Time } from "../Time";
import { Plate } from "../Plate";
import { Star } from "../Star";
import { NewStar } from "../NewStar";

export const PopUpDinner = ({
  likeAndUpdate,
  selectedDinner,
  setSelectedDinner,
  user,
}) => {
  const handleClick = () => {
    setSelectedDinner("");
  };

  const likeAndUpdatePopUp = async (e, id) => {
    try {
      if (localStorage.getItem("token")) {
        await likeAndUpdate(e, id);
        let updatedRecipe = await updateTheRecipeInfo(e, selectedDinner._id);
        setSelectedDinner(updatedRecipe);
      }
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
        <div className="heading">{selectedDinner.recipeTitle}</div>
        <button className="close-popup" onClick={handleClick}>
          &times;
        </button>
        <div className="content-container">
          <div className="container-left">
            <div className="recipeImage">
              <img src={`/api/v1/storage/${selectedDinner.picture}`} alt="" />
            </div>
            <div className="serverFor">
              <span>Best Server For</span>
              <Button
                buttonType={"register-btn card"}
                usageFor={selectedDinner.category}
              />
            </div>
            <div className="p-container">
              <p>{selectedDinner.fabula}</p>
            </div>
            <div className="attributes-container diffrent">
              <div className="time-container">
                <Time />
                {selectedDinner.prepTime} min
              </div>
              <div className="person-container">
                <Plate />
                {selectedDinner.pplFor}{" "}
                {selectedDinner.pplFor > 1 ? "persons" : "person"}
              </div>
              <div
                className="rating-container"
                onClick={(e) => likeAndUpdatePopUp(e, selectedDinner._id)}
              >
                {selectedDinner.likedBy.includes(user) ? <NewStar /> : <Star />}
                {selectedDinner.like}
              </div>
            </div>
          </div>
          <div className="container-right">
            <span>Recipe Details</span>
            <p>{selectedDinner.recipe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
