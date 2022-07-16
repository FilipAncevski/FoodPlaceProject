import React from "react";

import "../css/RecipeCard.css";

import { Time } from "./Time";
import { Plate } from "./Plate";
import { Star } from "./Star";
import { Button } from "./Button";
import { ArrowsRight } from "./ArrowsRight";

export const RecipeCard = ({
  title,
  shortDesc,
  prepTime,
  noPpl,
  likes,
  picture,
  category,
  onClick,
}) => {
  return (
    <div className="card-container" id="card" onClick={onClick}>
      <div className="image-container">
        <img src={`/api/v1/storage/${picture}`} alt="" />

        <Button buttonType={"register-btn card"} usageFor={category} />
      </div>
      <div className="info-container">
        <div className="heading-description-container">
          <h3>{title}</h3>
          <p>{shortDesc}</p>
        </div>
        <div className="attributes-container">
          <div className="time-container">
            <Time />
            {prepTime} min
          </div>
          <div className="person-container">
            <Plate />
            {noPpl} {noPpl > 1 ? "persons" : "person"}
          </div>
          <div className="rating-container">
            <Star />
            20
          </div>
          <button className="arrows">
            <ArrowsRight />
          </button>
        </div>
      </div>
    </div>
  );
};
