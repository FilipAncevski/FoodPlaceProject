import React, { useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import "../css/App.css";
import { MainPage } from "./MainPage";
import { RecipeContext } from "../utils/RecipeContext";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState("");

  return (
    <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe }}>
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
