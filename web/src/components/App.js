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
      let test = data;
      console.log(test);
      setRecepies(test);
      console.log(recepies);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getData();
    console.log(recepies);
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        selectedRecipe,
        setSelectedRecipe,
        recepies,
        setRecepies,
      }}
    >
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
    </RecipeContext.Provider>
  );
}

export default App;
