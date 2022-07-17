import React, { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import "../css/App.css";
import { MainPage } from "./MainPage";
import { RecipeContext } from "../utils/RecipeContext";
import { AllRecipiesContext } from "../utils/RecipeContext";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState("");

  const [recepies, setRecepies] = useState([]);

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

  useEffect(() => {
    getData();
  });

  return (
    <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe }}>
      <AllRecipiesContext.Provider value={{ recepies }}>
        <div className="App">
          <nav>
            <Nav />
          </nav>
          <main>
            <MainPage />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </AllRecipiesContext.Provider>
    </RecipeContext.Provider>
  );
}

export default App;
