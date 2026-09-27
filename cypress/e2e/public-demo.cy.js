describe("public Lite demo release checks", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(window) {
        window.localStorage.clear();
      },
    });
  });

  it("keeps language and theme choices across reloads", () => {
    for (const theme of ["light", "dark", "system"]) {
      for (const locale of [
        { value: "en", lang: "en", start: "Start simulation" },
        { value: "pt-BR", lang: "pt-BR", start: "Iniciar simulado" },
      ]) {
        cy.get(".preferences select").eq(0).select(locale.value);
        cy.get(".preferences select").eq(1).select(theme);
        cy.get("html").should("have.attr", "lang", locale.lang);
        cy.get("html").should("have.attr", "data-theme", theme);
        cy.reload();
        cy.get("html").should("have.attr", "lang", locale.lang);
        cy.get("html").should("have.attr", "data-theme", theme);
        cy.contains("button", locale.start).should("be.visible");
      }
    }
  });

  it("supports keyboard navigation and records a response", () => {
    cy.contains("button", "Start simulation").click();
    cy.get("body").type("a");
    cy.get('.answers input[type="radio"]').first().should("be.checked");
    cy.get("body").type("{rightarrow}");
    cy.get(".question-grid .current").should("have.text", "2");
    cy.get("body").type("f");
    cy.contains("button", "Unflag").should("be.visible");
  });

  it("downloads personal reports without exporting an answer key", () => {
    cy.contains("button", "Start simulation").click();
    cy.contains("button", "Submit").click();
    cy.get('[role="dialog"]').within(() => cy.contains("button", "Submit now").click());

    cy.contains("button", "Export JSON").click();
    cy.readFile("cypress/downloads/aif-c01-result.json", { timeout: 10000 }).then((content) => {
      expect(content).to.have.property("certification", "AIF-C01");
      expect(JSON.stringify(content)).not.to.match(/correctAnswer|answerKey|"answers"|AWS_SECRET_ACCESS_KEY/i);
    });

    cy.contains("button", "Export AI brief").click();
    cy.readFile("cypress/downloads/aif-c01-study-brief.md", { timeout: 10000 }).then((content) => {
      expect(content).to.contain("Raw static-demo practice score");
      expect(content).not.to.match(/correctAnswer|answerKey|AWS_SECRET_ACCESS_KEY/i);
    });
  });

  it("shows the independent-use and source-license notices in both locales", () => {
    cy.contains("footer.public-notice", "Independent study resource").should("be.visible");
    cy.contains("footer.public-notice a", "View source and license")
      .should("have.attr", "href", "https://github.com/nastaso/cloudcertprep");

    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.contains("footer.public-notice", "Material de estudo independente").should("be.visible");
    cy.contains("footer.public-notice a", "Ver código-fonte e licença").should("be.visible");
  });

  it("passes accessibility checks on welcome, simulation, and results", () => {
    for (const theme of ["light", "dark", "system"]) {
      for (const locale of [
        { value: "en", start: "Start simulation", submit: "Submit", submitNow: "Submit now" },
        { value: "pt-BR", start: "Iniciar simulado", submit: "Entregar", submitNow: "Entregar agora" },
      ]) {
        cy.visit("/", { onBeforeLoad: (window) => window.localStorage.clear() });
        cy.get(".preferences select").eq(0).select(locale.value);
        cy.get(".preferences select").eq(1).select(theme);
        cy.injectAxe();
        auditAccessibility();

        cy.contains("button", locale.start).click();
        auditAccessibility();

        cy.contains("button", locale.submit).click();
        cy.get('[role="dialog"]').within(() => cy.contains("button", locale.submitNow).click());
        auditAccessibility();
      }
    }
  });
});

function auditAccessibility() {
  cy.checkA11y(
    undefined,
    { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } },
    (violations) => {
      const summary = violations
        .map((violation) => `${violation.id} (${violation.impact}): ${violation.nodes.map((node) => node.target.join(", ")).join("; ")}`)
        .join("\n");
      cy.task("log", summary);
    },
  );
}
