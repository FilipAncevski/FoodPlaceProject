import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./components/App";
import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
