import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes?*");
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.q) {
      setSearchTerm(params.q);
    }
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      const url = new URL(window.location.href);
      url.searchParams.set("q", value);
      window.history.pushState({}, "", url);
    } else {
      setSuggestions([]);
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      window.history.pushState({}, "", url);
    }

    // Update the URL
    const url = new URL(window.location.href);
    url.searchParams.set("q", value);
    window.history.pushState({}, "", url);
  };

  const handleSuggestionClick = (recipe) => {
    setSelectedRecipe(recipe);
    setSearchTerm(recipe.name);
    setSuggestions([]);
  };

  return (
    <Container className="mt-5">
      <h2>Recipe Search</h2>
      <Form.Group controlId="recipe-search" className="mb-3">
        <Form.Label>Enter Recipe Name:</Form.Label>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a recipe"
        />
        <ListGroup className="mt-2" data-test="recipe-list">
          {suggestions.map((recipe) => (
            <ListGroup.Item
              key={recipe.id}
              action
              onClick={() => handleSuggestionClick(recipe)}
              data-test="recipe-items"
            >
              {recipe.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>
      {selectedRecipe && (
        <Row className="mt-4">
          <Col md={8} className="mb-4">
            <Card className="card">
              <Card.Img
                variant="top"
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                style={{ objectFit: "cover", width: "100%", height: "300px" }}
              />
              <Card.Body>
                <Card.Title
                  data-test="recipe-name"
                  className="d-flex align-items-center gap-2"
                >
                  {selectedRecipe.name}
                  <span className="badge bg-success text-white">
                    {selectedRecipe.rating} ★
                  </span>
                  <span className="text-secondary" style={{ fontSize: "14px" }}>
                    ({selectedRecipe.reviewCount} reviews)
                  </span>
                </Card.Title>
                <Card.Text
                  data-test="recipe-description"
                  className="pt-3 d-flex flex-column gap-2"
                >
                  <strong>Ingredients: </strong>
                  {selectedRecipe.ingredients}
                  <br />
                  <strong>Instructions: </strong>
                  <ul>
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RecipeSearch;
