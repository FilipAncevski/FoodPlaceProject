import React from "react";

import { Button } from "../Button";
import { Time } from "../Time";
import { Plate } from "../Plate";
import { Star } from "../Star";
import { NewStar } from "../NewStar";

export const PopUpBrunch = ({
  likeAndUpdate,
  selectedBrunch,
  setSelectedBrunch,
  user,
}) => {
  const handleClick = () => {
    setSelectedBrunch("");
  };

  const likeAndUpdatePopUp = async (e, id) => {
    try {
      if (localStorage.getItem("token")) {
        await likeAndUpdate(e, id);
        let updatedRecipe = await updateTheRecipeInfo(e, selectedBrunch._id);
        setSelectedBrunch(updatedRecipe);
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
        <div className="heading">{selectedBrunch.recipeTitle}</div>
        <button className="close-popup" onClick={handleClick}>
          &times;
        </button>
        <div className="content-container">
          <div className="container-left">
            <div className="recipeImage">
              <img src={`/api/v1/storage/${selectedBrunch.picture}`} alt="" />
            </div>
            <div className="serverFor">
              <span>Best Server For</span>
              <Button
                buttonType={"register-btn card"}
                usageFor={selectedBrunch.category}
              />
            </div>
            <div className="p-container">
              <p>{selectedBrunch.fabula}</p>
            </div>
            <div className="attributes-container diffrent">
              <div className="time-container">
                <Time />
                {selectedBrunch.prepTime} min
              </div>
              <div className="person-container">
                <Plate />
                {selectedBrunch.pplFor}{" "}
                {selectedBrunch.pplFor > 1 ? "persons" : "person"}
              </div>
              <div
                className="rating-container"
                onClick={(e) => likeAndUpdatePopUp(e, selectedBrunch._id)}
              >
                {selectedBrunch.likedBy.includes(user) ? <NewStar /> : <Star />}
                {selectedBrunch.like}
              </div>
            </div>
          </div>
          <div className="container-right">
            <span>Recipe Details</span>
            <p>{selectedBrunch.recipe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
