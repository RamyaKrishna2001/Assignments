/* eslint-disable no-undef */
/// <reference types="cypress" />

const restaurants = [
  "McDonalds",
  "KFC",
  "Starbucks",
  "Dairy Queen",
  "Burger King",
  "Taco Bell",
  "Subway",
  "Pizza Hut",
  "Dominos",
];

const properties = [
  "name",
  "whereToOrder",
  "description",
  "secret",
  "popularity",
  "price",
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe("Navigate to Secret Menu Page", () => {
  beforeEach(() => {
    cy.viewport(1510, 1200);
    cy.visit("http://localhost:3000");
    cy.get('[data-test="side-bar-items"]').should("exist");
    cy.get('[data-test="secret-menu"]').click();
    cy.window().then((window) => {
      expect(window.localStorage.getItem("selectedRoute")).to.equal(
        "secret-menu"
      );
    });
  });

  describe("Secret Menu Items", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/secret-menu");

      cy.get('[data-test="numberRange-input"]').as("rating");
      cy.get('[data-test="restaurants-input"]').as("restaurant-filter");
    });

    it("should have the title on the page", () => {
      cy.get("#secret-menu").should("contain.text", "Secret Menu Items");
    });

    it("should uncheck the checkbox and verify it", () => {
      cy.get("#name-input").as("checkbox");
      cy.get("@checkbox").uncheck();
      cy.get("@checkbox").should("not.be.checked");
    });

    for (const property of properties) {
      it(`should have column for ${property}`, () => {
        cy.get(`#${property}-column`).should("exist");
      });

      it(`should have ${property} label with checkbox`, () => {
        cy.get(`#${property}-input`).should("exist");
        cy.get(`[for=${property}]`).should("exist");
      });

      it(`should hide the ${property} column if unchecked`, () => {
        cy.get(`#${property}-input`).uncheck();
        cy.get(`#${property}-column`).should("not.exist");
      });
    }

    describe("Restaurant Filter", () => {
      it("should select an option from the select and verify it", () => {
        cy.get("@restaurant-filter").select("Starbucks");
        cy.get("@restaurant-filter").should("have.value", "Starbucks");
      });

      for (const restaurant of restaurants) {
        it(`should only display rows that match ${restaurant} when selected`, () => {
          cy.get("@restaurant-filter").select(restaurant);
          cy.get("#whereToOrder").should("contain", restaurant);
        });
      }
    });

    describe("Ratings Filter", () => {
      it("should set the range and verify it", () => {
        cy.get("@rating").invoke("val", "6").trigger("input");
        cy.get("@rating").should("have.value", "6");
      });

      for (const rating of ratings) {
        it(`should only display items with a popularity equal to and above ${rating}`, () => {
          cy.get("@rating").invoke("val", rating).trigger("input");
          cy.get("#popularity").each(($el) => {
            expect(Number($el.text())).to.be.gte(rating);
          });
        });
      }
    });
  });
});
