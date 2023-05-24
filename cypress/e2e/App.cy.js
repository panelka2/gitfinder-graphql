describe("App E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("should be visible start page", () => {
    cy.get('[placeholder="Search"]').should("have.value", "");

    cy.contains("GitFinder");

    cy.get(".icon").should("be.visible");

    cy.contains("Nothing");

    cy.contains("GitFinder").click();

    cy.get('[placeholder="Search"]').should("have.value", "");

    cy.contains("GitFinder");

    cy.get(".icon").should("be.visible");

    cy.contains("Nothing");
  });

  it("checking all buttons pagination", () => {
    cy.get('[placeholder="Search"]').type("calculator");

    cy.get('[placeholder="Search"]').should("have.value", "calculator");

    cy.intercept("POST", "https://api.github.com/graphql").as("graphqlRequest");

    cy.contains("Searching...").should("be.visible");

    cy.wait("@graphqlRequest", { timeout: 10000 });

    cy.get('[data-testid="items-list"]').should("be.visible");

    cy.get('[data-testid="pagination-block"]').should("be.visible");

    cy.get('[data-testid="pagination-block"]').find(".selected");

    for (let i = 1; i <= 10; i++) {
      cy.get('[data-testid="pagination-block"]')
        .find(".selected")
        .should("contain.text", `${i}`);

      if (i === 10) {
        break;
      }
      cy.get('[data-testid="right-arrow"]').click();
    }

    for (let n = 10; n >= 1; n--) {
      cy.get('[data-testid="pagination-block"]')
        .find(".selected")
        .should("contain.text", `${n}`);

      if (n === 1) {
        break;
      }

      cy.get('[data-testid="left-arrow"]').click();
    }
  });
  it("should find calculator repository and open about page", () => {
    cy.get('[placeholder="Search"]').type("calculator");

    cy.get('[placeholder="Search"]').should("have.value", "calculator");

    cy.reload();

    cy.wait(5000);

    cy.get('[placeholder="Search"]').should("have.value", "calculator");

    cy.url().should("include", "/?search=calculator");

    cy.contains("More...")
      .invoke("attr", "href")
      .then((href) => {
        cy.contains("More...").invoke("removeAttr", "target").click();
        cy.intercept("POST", "https://api.github.com/graphql").as(
          "graphqlRequest"
        );

        cy.contains("Ищем... ищем... такс такс что тут у нас ...").should(
          "be.visible"
        );

        cy.url().then((currentUrl) => {
          expect(currentUrl).to.include(href);
        });
        cy.contains("calculator").click();
      });

    cy.url().then((currentUrl) => {
      cy.window().then((win) => {
        win.localStorage.setItem("savedUrl", currentUrl);
      });

      cy.reload();

      cy.window().then((win) => {
        const savedUrl = win.localStorage.getItem("savedUrl");
        expect(currentUrl).to.equal(savedUrl);
      });

      cy.contains("Ищем... ищем... такс такс что тут у нас ...").should(
        "be.visible"
      );

      cy.contains("calculator").should("be.visible");

      cy.contains("microsoft").should("be.visible");

      cy.contains("PowerShell").should("be.visible");

      cy.contains("C#").should("be.visible");

      cy.contains("GitFinder").click();

      cy.get('[placeholder="Search"]').should("have.value", "");
    });
  });
});
