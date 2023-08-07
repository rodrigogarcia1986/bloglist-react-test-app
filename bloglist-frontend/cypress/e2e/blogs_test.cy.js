/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      it("user can login", function () {
        beforeEach(function () {
          cy.visit("http://localhost:3000");
        });
        cy.get("#username").type("Alice");
        cy.get("#password").type("456cde*G");
        cy.get("#login-button").click();
        cy.contains("Alice linda logged in");
      });
    });

    it("fails with wrong credentials", function () {
      it("user can login", function () {
        beforeEach(function () {
          cy.visit("http://localhost:3000");
        });
        cy.get("#username").type("eu");
        cy.get("#password").type("123456");
        cy.get("#login-button").click();
        cy.contains("unauthorized");
      });
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3000/api/login", {
        username: "Alice",
        password: "456cde*G",
      }).then((response) => {
        localStorage.setItem(
          "blogsAppLoggedUser",
          JSON.stringify(response.body),
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("create").click();
      cy.get("#title").type("Arma uirumquecano");
      cy.get("#author").type("Homer");
      cy.get("#url").type("www.thelatinlibrary.com");
      cy.get("#create").click();
      cy.contains("Arma uirumquecano");
    });
  });

  it.only("User can like a blog", function () {
    cy.contains("Arma uirumquecano").contains("view").click();
    cy.contains("like");
  });
});
