import React, { useState } from "react";

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
    prepTime: "",
    pplFor: "",
    fabula: "",
    recipe: "",
  };

  const [recipeInfo, setRecipeInfo] = useState(recipe);
  // eslint-disable-next-line
  const [selectedFile, setSelectedFile] = useState();
  // eslint-disable-next-line
  const [isSeleced, setIsSelected] = useState(false);

  const [picturePreview, setPicturePreview] = useState();

  const [dataErrors, setDataErrors] = useState({});

  const navigate = useNavigate();

  const trimData = (object) => {
    return Object.keys(object).map(
      (k) =>
        (object[k] =
          typeof object[k] == "string" ? object[k].trim() : object[k])
    );
  };

  const validate = (values) => {
    const errors = {};

    const DATA_TYPE = ["image/jpeg", "image/png", "image/pjpeg", "image/gif"];

    if (!values.recipeTitle) {
      errors.recipeTitle =
        "Recipe Title is required to be betweend 3 and 15 letters.";
    } else if (values.recipeTitle.length < 4) {
      errors.recipeTitle = "First name must be more than 4 characters";
    } else if (values.recipeTitle.length >= 30) {
      errors.recipeTitle = "First name cannot exceed more than 30 characters";
    }

    if (!values.category) {
      errors.category = "This field is required.";
    }

    if (!values.prepTime) {
      errors.prepTime = "Field is required!";
    } else if (isNaN(values.prepTime)) {
      errors.prepTime = "This field must be a number!";
    } else if (values.prepTime > 1440) {
      errors.prepTime = "Max preparation time is 1 day";
    } else if (values.prepTime <= 0) {
      errors.prepTime = "Min prepration time is 1 min";
    }

    if (!values.pplFor) {
      errors.pplFor = "Field is required!";
    } else if (isNaN(values.pplFor)) {
      errors.pplFor = "This field must be a number!";
    } else if (values.pplFor >= 20) {
      errors.pplFor = "You must run a catering\nfirm. Max value is 19";
    } else if (values.pplFor <= 0) {
      errors.pplFor = "Every meal is meant for at least one person";
    }

    if (!values.fabula) {
      errors.fabula = "Short Description is required";
    } else if (countWords(values.fabula) > 55) {
      errors.fabula = `Max word count exceeded by ${
        countWords(values.fabula) - 55
      }`;
    }

    if (!values.recipe) {
      errors.recipe = "Recipe is required";
    } else if (countWords(values.recipe) > 160) {
      errors.recipe = `Max word count exceeded by ${
        countWords(values.recipe) - 160
      }`;
    }

    if (!selectedFile) {
      errors.picture = "Please choose a picture for the recipe";
    }

    if (selectedFile) {
      if (selectedFile.size > 437500) {
        errors.picture = "File upload is too large";
      }

      if (!DATA_TYPE.includes(selectedFile.type)) {
        errors.picture = `File type isnt supported.\nOnly jpeg, png, pjpeg, gif files are allowed`;
      }
    }

    return errors;
  };

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

  const countWords = (str) => {
    const arr = str.split(" ");

    return arr.filter((word) => word !== "").length;
  };

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setPicturePreview(URL.createObjectURL(e.target.files[0]));
    setIsSelected(true);
  };

  const cancelRecipe = (e) => {
    e.preventDefault();
    navigate("/myrecepies");
  };

  const createRecipe = async (e) => {
    e.preventDefault();

    try {
      setDataErrors(validate(recipeInfo));

      const check = validate(recipeInfo);

      if (Object.keys(check).length === 0) {
        let image = await recipeImage(e);
        await recipeText(e, image);
        navigate("/myrecepies");
        return Promise.resolve(image);
      }
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

      trimData(data);

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

  // useEffect(() => {
  //   console.log(selectedFile);
  // }, [selectedFile]);

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
                  <span className="errors picture">{dataErrors.picture}</span>
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
                />
                <span className="errors">{dataErrors.recipeTitle}</span>
              </div>
              <div className="category-prep-time-no-ppl">
                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    onChange={onChangeRecipe}
                    id="category"
                    name="category"
                    value={recipeInfo.category}
                  >
                    <option value="">Choose an option</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="brunch">Brunch</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                  <span className="errors cat">{dataErrors.category}</span>
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
                  />
                  <span className="errors">{dataErrors.prepTime}</span>
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
                  />
                  <span className="errors">{dataErrors.pplFor}</span>
                </div>
              </div>
              <div className="short-description">
                <label htmlFor="fabula">Short Description</label>
                <textarea
                  placeholder="Please explain the recipe shortly."
                  type={"text"}
                  id="fabula"
                  name="fabula"
                  onChange={onChangeRecipe}
                  value={recipeInfo.fabula}
                />
                <span className="errors">{dataErrors.fabula}</span>
              </div>
              <div className="form-btn-recipe" onClick={createRecipe}>
                <Button usageFor={"SAVE"} buttonType={"register-btn"} />
              </div>
            </div>
            <div className="column">
              <label htmlFor="recipe">Recipe</label>
              <textarea
                placeholder="Here your can explain the whole recipe."
                id="recipe"
                name="recipe"
                type={"text"}
                onChange={onChangeRecipe}
                value={recipeInfo.recipe}
              />
              <span className="errors">{dataErrors.recipe}</span>
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
