import React from "react";
import { RecipeCard } from "./RecipeCard";
import "../css/MainPage.css";

export const MainPage = () => {
  return (
    <div className="container" id="main-page">
      <div className="fresh-new">
        <div className="heading-line-container">
          <div className="heading">
            <h1>Fresh & New</h1>
          </div>
          <div className="line-container"></div>
        </div>
        <div className="recipies-cards-container">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
      <div className="most-popular-recipe">
        <div className="heading-line-container">
          <div className="heading">
            <h1>Most Popular Recipes</h1>
          </div>
          <div className="line-container"></div>
        </div>
        <div className="recipies-cards-container">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
    </div>
  );
};
