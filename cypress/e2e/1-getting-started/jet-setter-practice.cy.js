/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Navigate to Jet Setter", () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit("http://localhost:3000/jet-setter");
    it("should have a form", () => {
      cy.get('[data-test="add-item-input"]').should("exist");
      cy.get('[data-test="filter-input"]').should("exist");
    });
    it("should have an Add Item button that is disabled", () => {
      cy.get('[data-test="add-item-button"]').should("be.disabled");
    });
    it("should have a packed and unpacked items list", () => {
      cy.get('[data-test="unpacked-items-section"]').should("exist");
      cy.get('[data-test="packed-items-section"]').should("exist");
    });
    it("should have a mark all unpacked and remove all buttons", () => {
      cy.get('[data-test="mark-all-as-unpacked"]').should("exist");
      cy.get('[data-test="remove-all"]').should("exist");
    });

    cy.get('[data-test="unpacked-items-section"]').as("unpackedItems");
    cy.get('[data-test="packed-items-section"]').as("packedItems");
    cy.get('[data-test="all-items"]').as("allItems");

    cy.get('[data-test="filter-input"]').as("filterInput");
  });

  it("should set the selected route to the local storage", () => {
    cy.window().then((window) => {
      expect(window.localStorage.getItem("selectedRoute")).to.equal(
        "jet-setter"
      );
    });
  });

  describe("Create a new item", () => {
    it("should add an item to the unpacked list", () => {
      const item = "Badminton";
      cy.get('[data-test="add-item-input"]').type(item);
      cy.get('[data-test="add-item-button"]').click();
      cy.get('[data-test="unpacked-items-section"]').last().contains(item);
    });
  });

  describe("Filtering item", () => {
    it("should show items that match whatever is in the filter field", () => {
      cy.get('[data-test="filter-input"]').type("Tooth");
      cy.contains("Tooth Brush");
      cy.contains("Tooth Paste");
    });
    it("should show items that match whatever is in the filter field (better)", () => {
      cy.get('[data-test="filter-input"]').type("Tooth");

      cy.get('[data-test="unpacked-items-section"] span').each(($item) => {
        expect($item.text()).to.include("Tooth");
      });
    });
    it("should show items that match whatever is in the filter field (better, wrap)", () => {
      cy.get('[data-test="filter-input"]').type("Tooth");

      cy.get('[data-test="unpacked-items-section"] span').each(($item) => {
        cy.wrap($item).should("include.text", "Tooth");
      });
    });
  });

  describe("Mark all as unpacked", () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="packed-items-section"] span').should("not.exist");
    });
    it('should empty have all of the items in the "Unpacked" list (brittle)', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="unpacked-items-section"] span')
        .its("length")
        .should("eq", 6);
    });
  });

  describe("Mark individual item as packed", () => {
    it("should move an individual item from Unpacked to Packed (brittle)", () => {
      cy.get('[data-test="unpacked-items-section"] [type="checkbox"]')
        .first()
        .click();
      cy.get('[data-test="packed-items-section"] span')
        .last()
        .should("contain", "Tooth Brush");
    });
    it("should move an individual item from Unpacked to Packed (better)", () => {
      cy.get('[data-test="unpacked-items-section"] span')
        .first()
        .invoke("text")
        .then(($itemName) => {
          const itemNameToMove = $itemName;
          cy.get('[data-test="unpacked-items-section"] [type="checkbox"]')
            .first()
            .click();
          cy.get('[data-test="packed-items-section"] span')
            .last()
            .should("contain", itemNameToMove);
        });
    });
  });

  describe("Aliases", () => {
    it("should hold onto an alias", () => {
      cy.get("@unpackedItems")
        .find("div")
        .first()
        .within(() => {
          cy.get("span")
            .invoke("text")
            .as("itemText")
            .then((itemText) => {
              cy.get('input[type="checkbox"]').click();
              cy.get("@packedItems")
                .find("div")
                .last()
                .find("span")
                .should("have.text", itemText.trim());
            });
        });
    });

    it("should filter the items shown on the page", () => {
      cy.get("@filterInput").type("iPhone");

      cy.get("@allItems").should("contain.text", "iPhone");
      cy.get("@allItems").should("not.contain.text", "Hoodie");
    });
  });

  describe("Remove individual item", () => {
    it("should have a remove button on an item", () => {
      cy.get('[data-test="unpacked-items-section"] div').find(
        '[data-test="remove"]'
      );
    });
    it("should remove an element from the page", () => {
      cy.contains("Tooth Brush").parent().find('[data-test="remove"]').click();
      cy.contains("Tooth Brush").should("not.exist");
    });
    it("should remove an element from the page (better)", () => {
      cy.get('[data-test="unpacked-items-section"] div')
        .first()
        .invoke("text")
        .then(($itemText) => {
          cy.get('[data-test="remove"]').first().click();

          cy.get('[data-test="unpacked-items-section"]')
            .contains($itemText.trim())
            .should("not.exist");
        });
    });
  });

  describe("Remove all item", () => {
    it("should remove all packed and unpacked items on the page", () => {
      cy.get('[data-test="remove-all"]').click();
      cy.get('[data-test="packed-items-section"] span').should("not.exist");
    });
    it("should remove all packed and unpacked items on the page", () => {
      const message = "No items to display.";
      cy.get('[data-test="remove-all"]').click();
      cy.get('[data-test="unpacked-items-section"]')
        .contains(message)
        .should("exist");
      cy.get('[data-test="packed-items-section"]')
        .contains(message)
        .should("exist");
    });
  });
});
