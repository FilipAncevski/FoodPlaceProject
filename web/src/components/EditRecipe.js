import React from "react";
import { Button } from "./Button";
import { BackIcon } from "./BackIcon";
import "../css/EditRecipe.css";

export const EditRecipe = () => {
  return (
    <div className="container">
      <div className="heading-line-container">
        <div className="heading">
          <h1>My Recipes</h1>
        </div>
        <div className="line-container"></div>
        <div className="back-container">
          <BackIcon />
        </div>
      </div>
      <div className="section-container">
        <form>
          <div className="column">
            <label>Recipe Image</label>
            <div className="img-container">
              <img
                src="https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2021-10/sourdough-pizza-crust.jpg?itok=xI7udJaf"
                alt="img is broken"
              />
              <div className="btn-container">
                <Button usageFor={"UPLOAD IMAGE"} buttonType={"login-btn"} />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="title-container">
              <label htmlFor="title">Recipe Title</label>
              <input
                placeholder="Homemade Pizza"
                type={"text"}
                id="title"
                name="kitchen[title]"
              />
            </div>
            <div className="category-prep-time-no-ppl">
              <div>
                <label htmlFor="category">Category</label>
                <select id="category" name="kitchen[category]">
                  <option value="breakfast">Breakfast</option>
                  <option value="brunch">Brunch</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div>
                <label htmlFor="prepTime">Preparaton Time</label>
                <input
                  placeholder="45"
                  type={"text"}
                  id="prepTime"
                  name="kitchen[prepTime]"
                />
              </div>
              <div>
                <label htmlFor="pplFor">No. People</label>
                <input
                  placeholder="4"
                  type={"text"}
                  id="pplFor"
                  name="kitchen[pplFor]"
                />
              </div>
            </div>
            <div className="short-description">
              <label htmlFor="fabula">Short Description</label>
              <textarea
                placeholder="Lorem ipsum itn int fhasfoiasjhfoipasjfajfasoifioasjfdoiasjhfoiasfiohasfohasfhasoifhasoifhaosihfaoisfhaosihfaoihfaiohfaoishfoiashfouiashfoiashfoiashfoiashfoiashfoiashfoiashfoiuashfio"
                type={"text"}
                id="fabula"
                name="kitchen[fabula]"
              />
            </div>
            <div className="form-btn-recipe">
              <Button usageFor={"SAVE"} buttonType={"register-btn"} />
            </div>
          </div>
          <div className="column">
            <label htmlFor="recipe">Recipe</label>
            <textarea
              placeholder="Lorem ipsun itn "
              id="recipe"
              name="kitchen[recipe]"
              type={"text"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
