import React, { useState, useEffect } from "react";

import { RecipeCard } from "../RecipeCard";
import { Nav } from "../Nav";
import { Footer } from "../Footer";
import { PopUpDinner } from "../Popups/PopUpDinner";

export const Dinner = () => {
  const [selectedDinner, setSelectedDinner] = useState("");

  const [dinner, setDinner] = useState([]);

  let info = dinner.filter((recipe) => recipe.category === "dinner");

  //   // const getID = async () => {
  //   //   try {
  //   //     let res = await fetch("/api/v1/auth/userId", {
  //   //       method: "GET",
  //   //       headers: {
  //   //         "content-type": "application/json",
  //   //         authorization: `bearer ${localStorage.getItem("token")}`,
  //   //       },
  //   //     });
  //   //     let data = await res.json();
  //   //     proba = data.id;
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //   }
  //   // };

  const getData = async () => {
    try {
      let res = await fetch("/api/v1/kitchen/recepies", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
      setDinner(data);
    } catch (error) {
      return console.log(error);
    }
  };

  const likeAndUpdate = async (e, id) => {
    e.preventDefault();

    try {
      await likeUnlikeCard(e, id);
      await getData();
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
    setSelectedDinner(recipe);
  };

  useEffect(() => {
    getData();
    // if (localStorage.getItem("token")) {
    //   getID();
    // }
  }, []);

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <div className="container" id="main-page">
          <div className="fresh-new">
            <div className="heading-line-container breakfast">
              <div className="heading">
                <h1>Breakfast</h1>
              </div>
              <div className="line-container"></div>
            </div>
            <div className="recipies-cards-container">
              {info.map((recipe) => {
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
                  />
                );
              })}
            </div>
          </div>

          {selectedDinner !== "" && (
            <PopUpDinner
              likeAndUpdate={likeAndUpdate}
              selectedDinner={selectedDinner}
              setSelectedDinner={setSelectedDinner}
            />
          )}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
