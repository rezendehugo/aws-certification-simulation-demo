import { domainNames, translate } from "../i18n.ts";
import type { AnswerState, Locale, Question, Result } from "../types.ts";

const prompts: Record<Locale, string> = {
  en: "Create a focused lesson and 12 original questions for these weak objectives. Validate current facts against official AWS documentation. Do not reproduce real or leaked exam questions.",
  "pt-BR": "Crie uma aula focada e 12 questões originais sobre os temas com menor desempenho. Valide informações atuais usando a documentação oficial da AWS. Não reproduza questões reais ou vazadas de certificação.",
};

const reportNotes: Record<Locale, string> = {
  en: "Raw static-demo practice score; not an AWS scaled score.",
  "pt-BR": "Percentual bruto de acertos neste simulado; não equivale à pontuação em escala da AWS.",
};

export function markdownReport(
  result: Result,
  questions: Question[],
  answers: Record<string, AnswerState>,
  locale: Locale,
): string {
  const weak = [...result.domainScores].sort((a, b) => a.percentage - b.percentage).slice(0, 3);
  const missed = questions
    .filter(
      (question) =>
        question.scored &&
        answers[question.id]?.response &&
        weak.some((domain) => domain.domainId === question.domainId),
    )
    .map((question) => `- ${domainNames[locale][question.domainId]}: ${question.stem}`)
    .join("\n");
  return `# AIF-C01 — ${translate(locale, "result")}

${translate(locale, "score")}: ${result.score}/${result.total} (${result.percentage}%)
${reportNotes[locale]}
${translate(locale, "unanswered")}: ${result.unanswered}

## ${translate(locale, "domainPerformance")}

${result.domainScores.map((domain) => `- ${domainNames[locale][domain.domainId]} — ${domain.percentage}%`).join("\n")}

## ${translate(locale, "recommendations")}

${weak.map((domain) => `- ${domainNames[locale][domain.domainId]} (${domain.percentage}%)`).join("\n")}

## ${translate(locale, "evidence")}

${missed || `- ${translate(locale, "none")}`}

${prompts[locale]}
`;
}

export function jsonReport(result: Result, locale: Locale): string {
  const { domainScores, ...summary } = result;
  return JSON.stringify(
    {
      schemaVersion: 1,
      certification: "AIF-C01",
      locale,
      note: reportNotes[locale],
      ...summary,
      domainScores: domainScores.map(({ domainId, ...score }) => ({
        domain: domainNames[locale][domainId],
        ...score,
      })),
    },
    null,
    2,
  );
}

export function download(name: string, text: string, type: string): void {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}
