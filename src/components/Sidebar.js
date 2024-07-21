import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Sidebar({ onRouteChange, activeLink, setActiveLink }) {
  // Function to handle link click
  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
    onRouteChange(link);
  };

  useEffect(() => {
    // Retrieve active link from local storage on component mount
    const storedActiveLink = localStorage.getItem("activeLink");
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
  }, []);

  return (
    <div
      className="text-center"
      style={{
        width: "300px",
        height: "110vh",
        backgroundColor: "#495057",
        zIndex: "1",
      }}
      data-test="sidebar"
    >
      <h3 className="pt-4">
        <u>Cypress Applications</u>
      </h3>

      <ul
        data-test="side-bar-items"
        className="d-flex flex-column gap-2 pt-3 list-unstyled w-100"
      >
        <li
          className={`${activeLink === "jet-setter" ? "bg-dark" : ""} py-2`}
          data-test="jet-setter"
        >
          <Link
            to="/jet-setter"
            onClick={() => handleLinkClick("jet-setter")}
            className="text-light text-decoration-none"
          >
            Jet Setter
          </Link>
        </li>
        <li
          className={`${activeLink === "secret-menu" ? "bg-dark" : ""} py-2`}
          data-test="secret-menu"
        >
          <Link
            to="/secret-menu"
            onClick={() => handleLinkClick("secret-menu")}
            className="text-light text-decoration-none"
          >
            Secret Menu
          </Link>
        </li>
        <li
          className={`${activeLink === "products" ? "bg-dark" : ""} py-2`}
          data-test="products"
        >
          <Link
            to="/products"
            onClick={() => handleLinkClick("products")}
            className="text-light text-decoration-none"
          >
            Products
          </Link>
        </li>
        <li
          className={`${activeLink === "recipes" ? "bg-dark" : ""} py-2`}
          data-test="recipes"
        >
          <Link
            to="/recipes"
            onClick={() => handleLinkClick("recipes")}
            className="text-light text-decoration-none"
          >
            Recipes
          </Link>
        </li>
        <li
          className={`${
            activeLink === "obstacle-course" ? "bg-dark" : ""
          } py-2`}
          data-test="obstacle-course"
        >
          <Link
            to="/obstacle-course"
            onClick={() => handleLinkClick("obstacle-course")}
            className="text-light text-decoration-none"
          >
            Input Obstacles
          </Link>
        </li>
        <h3 className="pt-2">
          <u>Redux Applications</u>
        </h3>
        <li
          className={`${activeLink === "media-mix" ? "bg-dark" : ""} py-2`}
          data-test="media-mix"
        >
          <Link
            to="/media-mix"
            onClick={() => handleLinkClick("media-mix")}
            className="text-light text-decoration-none"
          >
            Media Mix
          </Link>
        </li>
        <li
          className={`${activeLink === "car-hub" ? "bg-dark" : ""} py-2`}
          data-test="car-hub"
        >
          <Link
            to="/car-hub"
            onClick={() => handleLinkClick("car-hub")}
            className="text-light text-decoration-none"
          >
            Car Hub
          </Link>
        </li>
        <li
          className={`${activeLink === "users" ? "bg-dark" : ""} py-2`}
          data-test="users"
        >
          <Link
            to="/users"
            onClick={() => handleLinkClick("users")}
            className="text-light text-decoration-none"
          >
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
