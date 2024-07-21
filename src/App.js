// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";
import JetSetter from "./components/JetSetter";
import SecretMenu from "./components/SecretMenu";
import InputObstacles from "./components/InputObstacles";
import Products from "./components/Products";
import RecipeSearch from "./components/Recipes";
import MediaMix from "./redux/MediaMix";
import CarHub from "./redux/CarHub";
import UsersList from "./redux/UsersList";

function App() {
  const [activeLink, setActiveLink] = useState("");

  const handleRouteChange = (route) => {
    localStorage.setItem("selectedRoute", route);
  };

  const handleHomeClick = () => {
    setActiveLink("");
    localStorage.removeItem("selectedRoute");
    localStorage.removeItem("activeLink");
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar
          onRouteChange={handleRouteChange}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <div className="d-flex p-2 h-25">
          <Link
            to="/"
            onClick={handleHomeClick}
            data-test="home-icon"
            className="ms-2"
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>
        </div>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/jet-setter" element={<JetSetter />} />
            <Route path="/secret-menu" element={<SecretMenu />} />
            <Route path="/obstacle-course" element={<InputObstacles />} />
            <Route path="/products" element={<Products />} />
            <Route path="/recipes" element={<RecipeSearch />} />
            <Route path="/media-mix" element={<MediaMix />} />
            <Route path="/car-hub" element={<CarHub />} />
            <Route path="/users" element={<UsersList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
