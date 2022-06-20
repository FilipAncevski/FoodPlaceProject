import React from "react";
import { Nav } from "./Nav";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import "../css/App.css";
import { MainPage } from "./MainPage";

function App() {
  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <MainPage />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
