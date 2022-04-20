describe("Campaigns", () => {
  const promptContent = "Welcome to our site!";

  it("Visit the Campaigns wizard", () => {
    cy.visitNewspackWizard("Campaigns");
  });

  it("Create a new prompt", () => {
    cy.get('[aria-label="Add New Prompt"]').click();
    // New prompt modal title.
    cy.get("h1").contains("Add New Prompt");
    cy.contains(".title", "Inline").click();

    cy.wpDismissBlockEditorIntro();

    cy.get('[aria-label="Add title"]').type("Welcome prompt");
    cy.get('[aria-label="Add block"]')
      .first()
      .type(promptContent);

    // Set the prompt to display at 0% depth.
    cy.contains("button", "Prompt").click();
    cy.contains("button", "Prompt Settings").click();
    cy.get(
      'input[type="number"][aria-label="Approximate Position (in percent)"]'
    )
      .clear()
      .type("0", { force: true });

    // Display on posts only.
    cy.contains("button", "Post Types").click();
    cy.uncheckInput("Pages");

    cy.wpPublishPost();
    cy.contains("Log Out").click({ force: true });
  });

  it("Visit site as a non-logged-in user and observe the prompt in an article", () => {
    cy.visitWPURL("/");

    // Expect not to see the prompt on the homepage.
    cy.get(".newspack-popup").should("not.exist");

    cy.get(".entry-title a")
      .first()
      .click();

    cy.get(".newspack-popup")
      .contains(promptContent, { timeout: 120000 })
      .should("be.visible");

    cy.compareVisualRegressionScreenshot(`prompt`, {
      element: ".entry-content"
    });
    cy.compareVisualRegressionScreenshot(`prompt--phone`, {
      element: ".entry-content",
      viewport: "iphone-6"
    });
  });
});
