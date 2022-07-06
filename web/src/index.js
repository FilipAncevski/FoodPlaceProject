import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./components/App";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { MyProfile } from "./components/MyProfile";
import { MyProfileMust } from "./components/MyProfileMust";
import { MyRecipes } from "./components/MyRecipes";
import { EditRecipe } from "./components/EditRecipe";

import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/myprofileTEST" element={<MyProfileMust />} />
      <Route path="/myrecepies" element={<MyRecipes />} />
      <Route path="/myrecepies/:id" element={<EditRecipe />} />
    </Routes>
  </Router>
);
