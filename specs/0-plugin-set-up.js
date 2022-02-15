describe("Set up Newspack plugin", () => {
  it("Log in to WordPress admin", () => {
    cy.wpLogin();
  });

  it("Install Newspack", () => {
    cy.get("#adminmenu").contains("Newspack").click();

    cy.assertURLIncludes("/wp-admin/admin.php?page=newspack-setup-wizard");
    cy.wpDismissPointers();

    cy.contains("Welcome to Newspack");

    cy.contains("Start a new site").click();
    cy.contains("Get Started").click();

    cy.contains("Installing…");

    cy.contains("a", "Continue", { timeout: 120000 }).click();
  });

  it("Configure Newspack", () => {
    cy.assertURLIncludes("newspack-setup-wizard#/settings");
    cy.fillInput("Site Title", "End To End");
    cy.contains("Continue").click();
    cy.assertURLIncludes("newspack-setup-wizard#/services");
    cy.contains("Continue").click();
    cy.assertURLIncludes("newspack-setup-wizard#/design");
    cy.contains("Finish").click();
  });

  it("The Setup wizard is done", () => {
    cy.contains("You’re ready to go!");
  });

  it("Go to dashboard", () => {
    cy.assertURLIncludes("newspack-setup-wizard#/completed");
    cy.contains("Go to Dashboard").click();

    // Wizards are here.
    cy.contains("Site Design");
    cy.contains("Reader Revenue");
    cy.contains("Advertising");

    // Site title has been updated.
    cy.get("#wp-admin-bar-site-name").contains("End To End");
  });

  it("Set AMP to standard mode via Health Check Wizard", () => {
    // On non-HTTPS site, the AMP plugin will start off in Reader Mode.
    cy.contains("Health Check").click();
    cy.contains("Configuration").click();
    cy.contains("Repair").click();
    cy.contains("AMP plugin is in standard mode.");
  });
});