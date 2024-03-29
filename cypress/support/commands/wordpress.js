// Dismiss small popups that obscure admin UI
// e.g. AMP plugin add one about AMP Stories
Cypress.Commands.add("wpDismissPointers", value => {
  if (Cypress.$(".wp-pointer").length > 0) {
    cy.get(".wp-pointer .close").click();
  }
});

Cypress.Commands.add("wpLogin", () => {
  cy.visit("http://localhost:8000/wp-login.php");

  // Cypress sometimes lost focus on the input when the page was
  // still loading, waiting here for a sec seems to fix that.
  cy.wait(1000);

  cy.get("input[name=log]")
    .type("admin")
    .should("have.value", "admin");

  cy.get("input[name=pwd]")
    .type("password")
    .should("have.value", "password");

  cy.contains("Log In").click();
});
