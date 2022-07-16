import React, { useState, useEffect, useContext } from "react";
import { RecipeCard } from "./RecipeCard";
import { RecipeContext } from "../utils/RecipeContext";
import "../css/MainPage.css";
import { PopUpRecipe } from "./PopUpRecipe";

export const MainPage = () => {
  const [recepies, setRecepies] = useState([]);

  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);

  const getData = async () => {
    try {
      let res = await fetch("/api/v1/kitchen/recepies", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      let data = await res.json();
      setRecepies(data);
      console.log(data.length);
    } catch (error) {
      return console.log(error);
    }
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  let test = recepies.slice(14, 17);

  useEffect(() => {
    getData();
  }, []);

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
          {test.map((recipe) => {
            return (
              <RecipeCard
                key={recipe._id}
                title={recipe.recipeTitle}
                shortDesc={recipe.fabula}
                prepTime={recipe.prepTime}
                noPpl={recipe.pplFor}
                picture={recipe.picture}
                category={recipe.category}
                onClick={() => openRecipe(recipe)}
              />
            );
          })}
          {/* <RecipeCard />
          <RecipeCard />
          <RecipeCard /> */}
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

      {selectedRecipe !== "" && <PopUpRecipe />}
    </div>
  );
};
