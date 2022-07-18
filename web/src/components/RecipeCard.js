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
  id,
  likeAndUpdate,
  liked,
  userId,
}) => {
  return (
    <div className="card-container" id="card">
      <div className="image-container" onClick={onClick}>
        <img src={`/api/v1/storage/${picture}`} className="image" alt="" />
        <div className="middle">
          <div className="text">Click me :)</div>
        </div>
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
          <div
            className="rating-container"
            onClick={(e) => likeAndUpdate(e, id)}
          >
            {/* {liked.includes(userId) ? <Star color={"yellow"} /> : <Star />} */}
            <Star />
            {likes}
          </div>
          <button className="arrows" onClick={onClick}>
            <ArrowsRight />
          </button>
        </div>
      </div>
    </div>
  );
};
