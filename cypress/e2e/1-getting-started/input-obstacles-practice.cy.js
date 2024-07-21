/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Navigate to Input obstacles", () => {
  beforeEach(() => {
    cy.viewport(1280, 1100);
    cy.visit("http://localhost:3000");
    cy.get('[data-test="obstacle-course"]').click();
    cy.window().then((window) => {
      expect(window.localStorage.getItem("selectedRoute")).to.equal(
        "obstacle-course"
      );
    });
  });

  describe("Basic Practice", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/obstacle-course");
    });

    it("should input text into the input field", () => {
      const message = "Hello World!";
      cy.get('[data-test="deep-thought-field"]').type(message);
      cy.get('[data-test="deep-thought-result"]').contains(message);
    });

    it("should control a select input", () => {
      cy.get('[data-test="fruit-select-field"]').select("Pineapple");
      cy.get('[data-test="fruit-select-result"]').contains("Pineapple");
    });

    it("should find and control a checkbox input", () => {
      cy.get('[data-test="toppings-result"]').contains("(None)");
      cy.get("#lettuce").check();
      cy.get("#tomato").check();
      cy.get('[data-test="toppings-result"]').contains("lettuce, tomato");
    });

    it("should find and control a radio input", () => {
      cy.get("#george").check();
      cy.get('[data-test="favorite-beatles-result"]').contains("George");
    });

    it("should find and control a color input", () => {
      cy.get("#favoriteColor").invoke("val", "#0000ff").trigger("input");
      cy.get("#favoriteColor").should("have.value", "#0000ff");
      cy.get('[data-test="favorite-color-result"]').should(
        "not.contain.text",
        "##181456"
      );
      // cy.get('[data-test="favorite-color-result"]').should(
      //   "contain.text",
      //   "#0000ff"
      // );
    });

    it("should find and control a date input", () => {
      cy.get("#datePicker").type("2021-12-31");
      cy.get('[data-test="datePicker-result"]').contains("2021-12-31");
    });

    it("should find and control a range input", () => {
      cy.get("#numberRange").invoke("val", "9").trigger("input");
      cy.get("#numberRange").should("have.value", "9");
      cy.get('[data-test="numberRange-result"]').should("not.have.value", "5");
      // cy.get('[data-test="numberRange-result"]').should("have.value", "9");
    });

    it("should find and control a file input", () => {
      cy.get("#fileInput").click();
      const fileName = "example.txt";
      cy.fixture(fileName).then((fileContent) => {
        cy.get("#fileInput").attachFile({
          fileContent: fileContent.toString(),
          fileName: fileName,
          mimeType: "text/plain",
        });
      });
      //   cy.get("#fileInput").should("have.value", fileName);
      cy.get('[data-test="fileInput-result"]').should("contain", fileName);
    });
  });
});
