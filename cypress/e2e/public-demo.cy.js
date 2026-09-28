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
        { value: "en", lang: "en", start: "Start simulation", title: "AIF-C01 Simulation Demo", minutes: "minutes", domains: "domains", source: "Source & attribution" },
        { value: "pt-BR", lang: "pt-BR", start: "Iniciar simulado", title: "Simulado AWS Certified AI Practitioner (AIF-C01)", minutes: "minutos", questions: "Questões", domains: "domínios", source: "Código-fonte e créditos" },
      ]) {
        cy.get(".preferences select").eq(0).select(locale.value);
        cy.get(".preferences select").eq(1).select(theme);
        cy.get("html").should("have.attr", "lang", locale.lang);
        cy.get("html").should("have.attr", "data-theme", theme);
        cy.title().should("equal", locale.title);
        cy.reload();
        cy.get("html").should("have.attr", "lang", locale.lang);
        cy.get("html").should("have.attr", "data-theme", theme);
        cy.title().should("equal", locale.title);
        cy.contains("button", locale.start).should("be.visible");
        cy.get(".facts").contains(locale.minutes).should("be.visible");
        if (locale.questions) cy.get(".facts").contains(locale.questions).should("be.visible");
        cy.get(".facts").contains(locale.domains).should("be.visible");
        cy.get(".welcome aside").contains(locale.source).should("be.visible");
        if (locale.value === "pt-BR") {
          cy.get('.preferences select').eq(0).find('option[value="pt-BR"]').should("have.text", "PT-BR");
        }
      }
    }
  });

  it("accurately describes browser-local progress and locally generated reports in both languages", () => {
    cy.get(".preferences select").eq(0).select("en");
    cy.get(".welcome section > p").first()
      .should("contain.text", "are saved in this browser")
      .and("contain.text", "Reports are generated on this device when you download them")
      .and("not.contain.text", "report remain");

    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.get(".welcome section > p").first()
      .should("contain.text", "ficam salvos localmente neste navegador")
      .and("contain.text", "O relatório é gerado no próprio dispositivo quando você o baixa")
      .and("not.contain.text", "relatório fica salvo");
  });

  it("explains the public demo's exam-security limitation in clear Portuguese", () => {
    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.get(".welcome section .eyebrow").should("have.text", "Demonstração interativa");
    cy.get(".welcome h1").should("have.text", "Prepare-se com foco para a certificação AWS Certified AI Practitioner.");
    cy.get(".welcome aside p")
      .should("contain.text", "O gabarito faz parte dos arquivos desta demonstração")
      .and("contain.text", "pode ser consultado no navegador")
      .and("not.contain.text", "versão estática");
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

  it("shows Portuguese domain and question-format names instead of source IDs", () => {
    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.contains("button", "Iniciar simulado").click();
    cy.get(".badges span").should("have.length", 2);
    cy.get(".badges span").eq(0).should("have.text", "Fundamentos de IA e ML");
    cy.get(".badges span").eq(1).should("have.text", "Múltipla escolha");
    cy.get(".badges").should("not.contain.text", "1.3");
  });

  it("labels a flagged question as one to revisit in Portuguese", () => {
    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.contains("button", "Iniciar simulado").click();
    cy.contains("button", "Marcar para revisão").click();
    cy.get(".summary").contains("dt", "Marcadas para revisão").parent().should("contain.text", "1");
    cy.contains("button", "Remover marcação").should("be.visible");
  });

  it("teaches the SSE-KMS permission distinction without raw markup", () => {
    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.contains("button", "Iniciar simulado").click();
    cy.get('button[aria-label="Questão 56"]').click();
    cy.get(".question-card h1").should("contain.text", "SSE-KMS");
    cy.get(".answers").should("contain.text", "kms:Decrypt").and("not.contain.text", "`");
    cy.get(".question-card").should("contain.text", "já tem permissão para ler objetos");
  });

  it("separates human label review from retired service availability", () => {
    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.contains("button", "Iniciar simulado").click();
    cy.get('button[aria-label="Questão 30"]').click();
    cy.get('.answers input[type="radio"]').eq(1).check({ force: true });
    cy.contains("button", "Finalizar simulado").click();
    cy.get('[role="dialog"]').within(() => cy.contains("button", "Finalizar agora").click());
    cy.contains(".review button", "Questão 30").click();
    cy.get(".review").should("contain.text", "conceito avaliado é a revisão humana");
    cy.get(".review").should("contain.text", "encerrou o suporte a esse serviço");
  });

  it("localizes accessible ordering controls in Portuguese", () => {
    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.contains("button", "Iniciar simulado").click();
    cy.get('button[aria-label="Questão 12"]').click();
    cy.get('button[aria-label="Mover para cima"]').should("be.visible");
    cy.get('button[aria-label="Mover para baixo"]').should("be.visible");
    cy.get('button[aria-label="Move up"]').should("not.exist");
  });

  it("downloads personal reports without exporting an answer key", () => {
    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.contains("button", "Iniciar simulado").click();
    cy.contains("button", "Finalizar simulado").click();
    cy.get('[role="dialog"]').within(() => cy.contains("button", "Finalizar agora").click());

    cy.contains("button", "Exportar JSON").click();
    cy.readFile("cypress/downloads/aif-c01-result.json", { timeout: 10000 }).then((content) => {
      expect(content).to.have.property("certification", "AIF-C01");
      expect(content.domainScores[0]).to.have.property("domain", "Fundamentos de IA e ML");
      expect(content.domainScores[0]).not.to.have.property("domainId");
      expect(JSON.stringify(content)).not.to.match(/correctAnswer|answerKey|"answers"|AWS_SECRET_ACCESS_KEY/i);
    });

    cy.contains("button", "Exportar resumo de estudo para usar com IA").click();
    cy.readFile("cypress/downloads/aif-c01-study-brief.md", { timeout: 10000 }).then((content) => {
      expect(content).to.contain("Percentual bruto de acertos neste simulado; não equivale à pontuação em escala da AWS.");
      expect(content).to.contain("Fundamentos de IA e ML");
      expect(content).to.contain("- Nenhuma");
      expect(content).not.to.match(/Domínio\s+1\b|Objective\s+1\.3|\bEvidence\b|\bNone\b/i);
      expect(content).not.to.match(/correctAnswer|answerKey|AWS_SECRET_ACCESS_KEY/i);
    });
  });

  it("shows the independent-use and source-license notices in both locales", () => {
    cy.contains("footer.public-notice", "Independent study resource").should("be.visible");
    cy.contains("footer.public-notice", "MIT License").should("be.visible");
    cy.contains("footer.public-notice a", "View source and license")
      .should("have.attr", "href", "https://github.com/nastaso/cloudcertprep");

    cy.get(".preferences select").eq(0).select("pt-BR");
    cy.contains("footer.public-notice", "Material de estudo independente").should("be.visible");
    cy.contains("footer.public-notice", "marcas comerciais da Amazon.com, Inc.").should("be.visible");
    cy.contains("footer.public-notice", "Licença MIT").should("be.visible");
    cy.contains("footer.public-notice", "Direitos autorais © 2026 Alex Santonastaso.").should("be.visible");
    cy.contains("footer.public-notice a", "Ver código-fonte e licença").should("be.visible");
  });

  it("passes accessibility checks on welcome, simulation, and results", () => {
    for (const theme of ["light", "dark", "system"]) {
      for (const locale of [
        { value: "en", start: "Start simulation", submit: "Submit", submitNow: "Submit now", readiness: "Readiness target: 80%" },
        { value: "pt-BR", start: "Iniciar simulado", submit: "Finalizar simulado", submitNow: "Finalizar agora", readiness: "Meta indicativa de acertos: 80%" },
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
        cy.get(".focus").should("contain.text", locale.readiness);
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
