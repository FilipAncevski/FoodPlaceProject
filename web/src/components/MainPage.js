import React, { useEffect, useContext, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { RecipeContext } from "../utils/RecipeContext";
import "../css/MainPage.css";
import { PopUpRecipe } from "./Popups/PopUpRecipe";

export const MainPage = () => {
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);

  const { recepies, setRecepies } = useContext(RecipeContext);

  const [user, setUser] = useState();

  let freshAndNew = recepies.slice(recepies.length - 3, recepies.length);

  let mostPopular = recepies.filter((recipe) => recipe.like >= 1);

  const getData = async () => {
    try {
      let res = await fetch("/api/v1/kitchen/recepies", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      let data = await res.json();
      setRecepies(data);
    } catch (error) {
      return console.log(error);
    }
  };
  const getID = async () => {
    try {
      let res = await fetch("/api/v1/auth/userId", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      setUser(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const likeAndUpdate = async (e, id) => {
    e.preventDefault();

    try {
      if (localStorage.getItem("token")) {
        await likeUnlikeCard(e, id);
        await getData();
      }
    } catch (error) {}
  };
  const likeUnlikeCard = async (e, id) => {
    e.preventDefault();

    const backendId = { id };

    try {
      let res = await fetch("/api/v1/kitchen/like", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(backendId),
      });
      let data = await res.json();
      console.log(data);
      return Promise.reject(data);
    } catch (error) {
      return Promise.resolve(error);
    }
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // let test = recepies.slice(recepies.length - 3, recepies.length);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getID();
    }
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
          {freshAndNew.map((recipe) => {
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
                likes={recipe.like}
                id={recipe._id}
                likeAndUpdate={likeAndUpdate}
                liked={recipe.likedBy}
                user={user}
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
          {mostPopular.map((recipe) => {
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
                likes={recipe.like}
                id={recipe._id}
                likeAndUpdate={likeAndUpdate}
                liked={recipe.likedBy}
                user={user}
              />
            );
          })}
        </div>
      </div>

      {selectedRecipe !== "" && (
        <PopUpRecipe likeAndUpdate={likeAndUpdate} user={user} />
      )}
    </div>
  );
};
