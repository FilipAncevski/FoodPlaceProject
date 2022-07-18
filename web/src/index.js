import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./components/App";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { MyProfileFinal } from "./components/MyProfileFinal";
import { MyRecipes } from "./components/MyRecipes";
import { EditRecipe } from "./components/EditRecipe";
import { NewRecipe } from "./components/NewRecipe";
import { Breakfast } from "./components/categories/Breakfast";
import { Brunch } from "./components/categories/Brunch";
import { Lunch } from "./components/categories/Lunch";
import { Dinner } from "./components/categories/Dinner";

import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/myprofile" element={<MyProfileFinal />} />
      <Route path="/myrecepies" element={<MyRecipes />} />
      <Route path="/myrecepies/:id" element={<EditRecipe />} />
      <Route path="/newrecipe" element={<NewRecipe />} />
      <Route path="/breakfast" element={<Breakfast />} />
      <Route path="/brunch" element={<Brunch />} />
      <Route path="/lunch" element={<Lunch />} />
      <Route path="/dinner" element={<Dinner />} />
    </Routes>
  </Router>
);
