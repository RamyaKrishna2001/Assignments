/* eslint-disable no-undef */
/// <reference types="cypress" />

const recipes = [
  { id: 1, name: "Mango Salsa Chicken" },
  { id: 2, name: "Butter Chicken (Murgh Makhani)" },
  { id: 3, name: "Lebanese Falafel Wrap" },
  { id: 4, name: "Vegetarian Stir-Fry" },
  { id: 5, name: "Beef and Broccoli Stir-Fry" },
];

describe("Visit Recipes Page", () => {
  beforeEach(() => {
    cy.viewport(1280, 1100);
    cy.visit("http://localhost:3000");
    cy.get('[data-test="recipes"]').click();
    cy.window().then((window) => {
      expect(window.localStorage.getItem("selectedRoute")).to.equal("recipes");
    });
  });

  describe("should display the recipes page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/recipes");

      cy.get("#recipe-search").as("search");
      cy.intercept("GET", "https://dummyjson.com/recipes?*").as("getRecipes");
    });

    it("should call the API when the user types", () => {
      cy.get("@search").type("chic");
      cy.get("@search").should("have.value", "chic");
      cy.request("@getRecipes").then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    it("should update the query parameter", () => {
      cy.get("@search").type("mar");
      cy.request("@getRecipes");
      cy.location("search").should("equal", "?q=mar");
    });

    it("should pre-populate the search field with the query parameter", () => {
      cy.visit({ url: "/recipes", qs: { q: "fa" } });
      cy.get("@search").should("have.value", "fa");
    });

    it("should render the results to the page", () => {
      cy.intercept("https://dummyjson.com/recipes?*", { recipes }).as(
        "stubbed-api"
      );
      cy.get("@search").type("c");
      cy.request("@stubbed-api").then(() => {
        cy.get('[data-test="recipe-list"]').should("have.length", 3);
      });
    });

    it("should immediately fetch a pokémon if a query parameter is provided", () => {
      cy.intercept("https://dummyjson.com/recipes?*", { recipes }).as(
        "stubbed-api"
      );
      cy.visit({ url: "/recipes", qs: { q: "chicken" } });

      cy.wait("@stubbed-api")
        .its("response.url")
        .should("contain", "?q=chicken");
    });
  });

  describe.only("Stubbed api", function () {
    beforeEach(() => {
      cy.visit("http://localhost:3000/recipes");

      cy.get("#recipe-search").as("search");
      cy.fixture("recipes.json").as("recipes");
      cy.intercept("GET", "https://dummyjson.com/recipes?*", (req) => {
        req.reply((res) => {
          res.send({
            body: this.recipes,
          });
        });
      }).as("getRecipes");
    });

    it("should call the API when the user types", () => {
      cy.get("@search").type("chic");
      cy.get("@search").should("have.value", "chic");
      cy.wait("@getRecipes").then(({ response }) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.recipes).to.have.length.greaterThan(0);
      });
    });

    it("should update the query parameter", () => {
      cy.get("@search").type("mar");
      cy.wait("@getRecipes");
      cy.location("search").should("equal", "?q=mar");
    });

    it("should pre-populate the search field with the query parameter", () => {
      cy.visit({ url: "/recipes", qs: { q: "fa" } });
      cy.get("@search").should("have.value", "fa");
    });

    it("should have a list of recipes with length greater than 0", () => {
      cy.get("@search").type("chicken");
      cy.wait("@getRecipes");
      cy.get('[data-test="recipe-list"]').should("have.length.greaterThan", 0);
    });

    it("should click the first list item after typing in the search field", () => {
      cy.get("@search").type("chicken");
      cy.wait("@getRecipes");
      cy.get('[data-test="recipe-items"]').first().click();
      cy.get(".card").should("exist");
    });
  });
});
