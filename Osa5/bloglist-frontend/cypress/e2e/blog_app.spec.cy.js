describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "User 123",
      username: "user123",
      password: "testisalasana",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    const user2 = {
      name: "User 2",
      username: "user2",
      password: "testisalasana",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("user123");
      cy.get("#password").type("testisalasana");
      cy.get("#login-button").click();

      cy.contains("User 123 logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("user123");
      cy.get("#password").type("virhesalasana");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "User 123 logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "user123",
        password: "testisalasana",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });
    describe("and a blog exist", function () {
      beforeEach(function () {
        cy.contains("new blog").click();
        cy.get("#title").type("test blog");
        cy.get("#author").type("test author");
        cy.get("#url").type("test url");
        cy.contains("create").click();
        cy.contains("a new blog test blog added");
      });

      it("A blog can be liked", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.get("#likes").should("contain", "likes 1");
      });

      it("A blog can be removed by creator", function () {
        cy.reload();
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.contains("Removed blog test blog");
      });

      it("A blog can not be removed by anybody else", function () {
        cy.contains("logout").click();
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "user2",
          password: "testisalasana",
        }).then((response) => {
          localStorage.setItem(
            "loggedBlogappUser",
            JSON.stringify(response.body)
          );
          cy.visit("http://localhost:3000");
        });
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.contains("You can not remove blog");
      });

      it("Blogs are sorted by likes", function () {
        cy.reload();
        cy.contains("new blog").click();
        cy.get("#title").type("test blog2");
        cy.get("#author").type("test author2");
        cy.get("#url").type("test url2");
        cy.contains("create").click();
        cy.reload();
        cy.contains("new blog").click();
        cy.get("#title").type("test blog3");
        cy.get("#author").type("test author3");
        cy.get("#url").type("test url3");
        cy.contains("create").click();
        cy.reload();

        cy.get(".blog").eq(0).should("contain", "test blog");
        cy.get(".view:last").click();
        cy.get(".like:last").click();
        cy.reload();
        cy.get(".blog").eq(0).should("contain", "test blog3");
      });
    });
  });
});
