import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Button } from "./Button";
import { PlusIcon } from "./PlusIcon";
import { TrashIcon } from "./TrashIcon";

import "../css/MyRecipes.css";

export const MyRecipes = () => {
  const navigate = useNavigate();

  const [recipies, setRecipies] = useState([]);

  const goToCreateRoute = (e) => {
    e.preventDefault();
    navigate("/newrecipe");
  };

  const editRecipe = (id) => {
    navigate(`/myrecepies/${id}`);
  };

  const deleteRecipe = async (e, id) => {
    e.preventDefault();

    try {
      await fetch(`/api/v1/kitchen/${id}`, {
        method: "DELETE",
        headers: {
          // "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("OKOKKKK");
      await getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      let res = await fetch("/api/v1/kitchen", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      setRecipies(data);
      console.log(recipies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <div className="container">
          <div className="heading-line-container">
            <div className="heading">
              <h1>My Recipes</h1>
            </div>
            <div className="line-container"></div>
            <div className="back-container" onClick={goToCreateRoute}>
              <PlusIcon />
            </div>
          </div>
          <div className="section-container">
            {recipies.length === 0 ? (
              <p>
                No recipies yet, please create some by clicking the on plus
                beneath LOG OUT
              </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th className="flex-1">Recipe Name</th>
                    <th className="flex-1">Category</th>
                    <th className="flex-1">Create On</th>
                    <th className="flex-9">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {recipies.map((recipe) => {
                    return (
                      <tr key={recipe._id}>
                        <td
                          className="flex-1"
                          onClick={() => editRecipe(recipe._id)}
                        >
                          {recipe.recipeTitle}
                        </td>
                        <td
                          className="flex-1"
                          onClick={() => editRecipe(recipe._id)}
                        >
                          <Button
                            buttonType={"register-btn"}
                            usageFor={"BRUNCH"}
                          />
                        </td>
                        <td
                          className="flex-1"
                          onClick={() => editRecipe(recipe._id)}
                        >
                          22.11.2020
                        </td>
                        <td
                          className="flex-9"
                          // onClick={}
                        >
                          <TrashIcon
                            trash={(e) => deleteRecipe(e, recipe._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* <table>
              <thead>
                <tr>
                  <th className="flex-1">Recipe Name</th>
                  <th className="flex-1">Category</th>
                  <th className="flex-1">Create On</th>
                  <th className="flex-9">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex-1">Homemade Pizza</td>
                  <td className="flex-1">
                    <Button buttonType={"register-btn"} usageFor={"BRUNCH"} />
                  </td>
                  <td className="flex-1">22.11.2020</td>
                  <td className="flex-9">
                    <TrashIcon />
                  </td>
                </tr>
                <tr>
                  <td className="flex-1">Homemade Pizza</td>
                  <td className="flex-1">
                    <Button buttonType={"register-btn"} usageFor={"BRUNCH"} />
                  </td>
                  <td className="flex-1">22.11.2020</td>
                  <td className="flex-9">
                    <TrashIcon />
                  </td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
