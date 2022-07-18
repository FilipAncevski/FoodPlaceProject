import React from "react";

import { Button } from "../Button";
import { Time } from "../Time";
import { Plate } from "../Plate";
import { Star } from "../Star";
import { NewStar } from "../NewStar";

export const PopUpLunch = ({
  likeAndUpdate,
  selectedLunch,
  setSelectedLunch,
  user,
}) => {
  const handleClick = () => {
    setSelectedLunch("");
  };

  const likeAndUpdatePopUp = async (e, id) => {
    try {
      if (localStorage.getItem("token")) {
        await likeAndUpdate(e, id);
        let updatedRecipe = await updateTheRecipeInfo(e, selectedLunch._id);
        setSelectedLunch(updatedRecipe);
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
        <div className="heading">{selectedLunch.recipeTitle}</div>
        <button className="close-popup" onClick={handleClick}>
          &times;
        </button>
        <div className="content-container">
          <div className="container-left">
            <div className="recipeImage">
              <img src={`/api/v1/storage/${selectedLunch.picture}`} alt="" />
            </div>
            <div className="serverFor">
              <span>Best Server For</span>
              <Button
                buttonType={"register-btn card"}
                usageFor={selectedLunch.category}
              />
            </div>
            <div className="p-container">
              <p>{selectedLunch.fabula}</p>
            </div>
            <div className="attributes-container diffrent">
              <div className="time-container">
                <Time />
                {selectedLunch.prepTime} min
              </div>
              <div className="person-container">
                <Plate />
                {selectedLunch.pplFor}{" "}
                {selectedLunch.pplFor > 1 ? "persons" : "person"}
              </div>
              <div
                className="rating-container"
                onClick={(e) => likeAndUpdatePopUp(e, selectedLunch._id)}
              >
                {selectedLunch.likedBy.includes(user) ? <NewStar /> : <Star />}
                {selectedLunch.like}
              </div>
            </div>
          </div>
          <div className="container-right">
            <span>Recipe Details</span>
            <p>{selectedLunch.recipe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
