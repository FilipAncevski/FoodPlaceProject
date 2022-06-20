import React from "react";

import "../css/RecipeCard.css";

import { Time } from "./Time";
import { Plate } from "./Plate";
import { Star } from "./Star";
import { Button } from "./Button";
import { ArrowsRight } from "./ArrowsRight";

export const RecipeCard = () => {
  return (
    <div className="card-container" id="card">
      <div className="image-container">
        <img
          src="https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2021-10/sourdough-pizza-crust.jpg?itok=xI7udJaf"
          alt=""
        />

        <Button buttonType={"register-btn"} usageFor={"breakfast"} />
      </div>
      <div className="info-container">
        <div className="heading-description-container">
          <h3>Homemade Pizza</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
          </p>
        </div>
        <div className="attributes-container">
          <div className="time-container">
            <Time />
            45 min
          </div>
          <div className="person-container">
            <Plate />4 person
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
