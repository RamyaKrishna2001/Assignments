/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Navigate to Products", () => {
  beforeEach(() => {
    cy.viewport(1280, 960);
    cy.visit("http://localhost:3000");
    cy.get('[data-test="products"]').click();
    cy.window().then((window) => {
      expect(window.localStorage.getItem("selectedRoute")).to.equal("products");
    });
  });

  describe("Fetching Products", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/products");

      cy.get("#product-select").as("select");
      cy.get('[data-test="fetch-button"]').as("fetchButton");
      cy.get('[data-test="clear-button"]').as("clearButton");

      cy.intercept("https://fakestoreapi.com/products").as("api");
    });

    it("should start out with an empty state", () => {
      cy.get(".table").should("not.exist");
    });

    it("should make a request when the button is called", () => {
      cy.get("@fetchButton").click();
      cy.wait("@api").then((interception) => {
        expect(interception.response.statusCode).to.eql(200);
      });
    });

    it("should no longer have an empty state after a fetch", () => {
      cy.get("@fetchButton").click();
      cy.get(".table").should("exist");
    });

    it("should show the correct number of products on the page", () => {
      cy.get("@select").select("6");
      cy.get("@fetchButton").click();
      cy.get("tbody tr").should("have.length", 6);
    });

    it('should clear the products when the "Clear" button is pressed', () => {
      cy.get("@select").select("7");
      cy.get("@fetchButton").click();
      cy.get("@clearButton").click();
      cy.get(".table").should("not.exist");
    });

    it("should reflect the number of facts we're looking for in the title", () => {
      cy.get("@select").select("3");
      cy.title().should("equal", "3 Products");
      cy.get("@select").select("1");
      cy.title().should("equal", "1 Product");
    });
  });
});
