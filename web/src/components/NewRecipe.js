import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Button } from "./Button";
import { BackIcon } from "./BackIcon";

import "../css/EditRecipe.css";
import "../css/NewRecipe.css";

export const NewRecipe = () => {
  const recipe = {
    recipeTitle: "",
    category: "",
    prepTime: "In minutes please",
    pplFor: 0,
    fabula: "",
    recipe: "",
  };

  const [recipeInfo, setRecipeInfo] = useState(recipe);
  // eslint-disable-next-line
  const [selectedFile, setSelectedFile] = useState();
  // eslint-disable-next-line
  const [isSeleced, setIsSelected] = useState(false);

  const [picturePreview, setPicturePreview] = useState();

  const navigate = useNavigate();

  const getInput = (e) => {
    e.preventDefault();
    document.getElementById("getFile").click();
  };

  const onChangeRecipe = (e) => {
    setRecipeInfo({
      ...recipeInfo,
      [e.target.name]: e.target.value,
    });
  };

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setPicturePreview(URL.createObjectURL(e.target.files[0]));
    console.log(selectedFile);
    setIsSelected(true);
  };

  const cancelRecipe = (e) => {
    e.preventDefault();
    navigate("/myrecepies");
  };

  const createRecipe = async (e) => {
    e.preventDefault();

    try {
      if (!selectedFile) {
        return alert("Please choose a picture for the recipe");
      }

      if (isNaN(recipeInfo.pplFor) || isNaN(recipeInfo.prepTime)) {
        return alert("For Prep. Time and No. People please enter numbers");
      }

      if (
        recipeInfo.recipeTitle === "" ||
        recipeInfo.category === "" ||
        recipeInfo.prepTime === "In minutes please" ||
        recipeInfo.pplFor === 0 ||
        recipeInfo.fabula === "" ||
        recipeInfo.recipe === ""
      ) {
        return alert("Please fill in the inputs");
      }

      let image = await recipeImage(e);
      let profile = await recipeText(e, image);
      console.log(image);
      console.log(profile);
      navigate("/myrecepies");
    } catch (error) {
      console.log(error);
    }
  };

  const recipeImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("File", selectedFile);

    try {
      const res = await fetch("/api/v1/storage", {
        method: "POST",
        body: formData,
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return Promise.resolve(data.file_name);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const recipeText = async (e, image) => {
    e.preventDefault(e);

    try {
      let data = { ...recipeInfo, picture: image };

      data = {
        ...data,
        prepTime: parseInt(recipeInfo.prepTime),
        pplFor: parseInt(recipeInfo.pplFor),
      };

      console.log(data);

      setRecipeInfo({ ...recipeInfo, picture: image });

      const res = await fetch("/api/v1/kitchen", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      return Promise.resolve(res);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    console.log(picturePreview);
  }, [picturePreview]);

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
            <div onClick={cancelRecipe} className="back-container">
              <BackIcon />
            </div>
          </div>
          <div className="section-container">
            <div className="column">
              <label>Recipe Image</label>
              <div className="img-container newrecipe">
                {selectedFile === undefined ? (
                  <img
                    src={
                      "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    }
                    alt=""
                  />
                ) : (
                  <img src={`${picturePreview}`} alt="Doesnt work" />
                )}
              </div>
              <form encType="multipart/form-data">
                <div className="btn-container">
                  <button className="new-recipe-button" onClick={getInput}>
                    UPLOAD IMAGE
                  </button>
                  <input
                    type="file"
                    id="getFile"
                    onChange={changeHandler}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="column">
              <div className="title-container">
                <label htmlFor="recipeTitle">Recipe Title</label>
                <input
                  placeholder="Enter recipe title"
                  type={"text"}
                  id="recipeTitle"
                  name="recipeTitle"
                  onChange={onChangeRecipe}
                  value={recipeInfo.recipeTitle}
                  required
                />
              </div>
              <div className="category-prep-time-no-ppl">
                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    onChange={onChangeRecipe}
                    id="category"
                    name="category"
                    value={recipeInfo.category}
                    required
                  >
                    <option value="">Choose an option</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="brunch">Brunch</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="prepTime">Preparaton Time</label>
                  <input
                    placeholder="In minutes please?"
                    type={"text"}
                    id="prepTime"
                    name="prepTime"
                    onChange={onChangeRecipe}
                    value={recipeInfo.prepTime}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pplFor">No. People</label>
                  <input
                    placeholder="For how many people?"
                    type={"text"}
                    id="pplFor"
                    name="pplFor"
                    onChange={onChangeRecipe}
                    value={recipeInfo.pplFor}
                    required
                  />
                </div>
              </div>
              <div className="short-description">
                <label htmlFor="fabula">Short Description</label>
                <textarea
                  placeholder="Lorem ipsum itn int fhasfoiasjhfoipasjfajfasoifioasjfdoiasjhfoiasfiohasfohasfhasoifhasoifhaosihfaoisfhaosihfaoihfaiohfaoishfoiashfouiashfoiashfoiashfoiashfoiashfoiashfoiashfoiuashfio"
                  type={"text"}
                  id="fabula"
                  name="fabula"
                  onChange={onChangeRecipe}
                  value={recipeInfo.fabula}
                  required
                />
              </div>
              <div className="form-btn-recipe" onClick={createRecipe}>
                <Button usageFor={"SAVE"} buttonType={"register-btn"} />
              </div>
            </div>
            <div className="column">
              <label htmlFor="recipe">Recipe</label>
              <textarea
                placeholder="Lorem ipsun itn "
                id="recipe"
                name="recipe"
                type={"text"}
                onChange={onChangeRecipe}
                value={recipeInfo.recipe}
                required
              />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
