import { domainNames, translate } from "../i18n";
import type { AnswerState, Locale, Question, Result } from "../types";

const prompts: Record<Locale, string> = {
  en: "Create a focused lesson and 12 original questions for these weak objectives. Validate current facts against official AWS documentation. Do not reproduce real or leaked exam questions.",
  "pt-BR": "Crie uma aula focada e 12 questões originais para estes objetivos com menor desempenho. Valide informações atuais usando a documentação oficial da AWS. Não reproduza questões reais ou vazadas de certificação.",
};

const reportNotes: Record<Locale, string> = {
  en: "Raw static-demo practice score; not an AWS scaled score.",
  "pt-BR": "Pontuação bruta de prática da demonstração; não é uma pontuação escalonada da AWS.",
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
    .map((question) => `- ${question.objective}: ${question.stem}`)
    .join("\n");
  return `# AIF-C01 — ${translate(locale, "result")}

${translate(locale, "score")}: ${result.score}/${result.total} (${result.percentage}%)
${translate(locale, "unanswered")}: ${result.unanswered}

## ${translate(locale, "domainPerformance")}

${result.domainScores.map((domain) => `- ${translate(locale, "domain")} ${domain.domainId}: ${domainNames[locale][domain.domainId]} — ${domain.percentage}%`).join("\n")}

## ${translate(locale, "recommendations")}

${weak.map((domain) => `- ${domainNames[locale][domain.domainId]} (${domain.percentage}%)`).join("\n")}

## Evidence

${missed || "- None"}

${prompts[locale]}
`;
}

export function jsonReport(result: Result, locale: Locale): string {
  return JSON.stringify(
    {
      schemaVersion: 1,
      certification: "AIF-C01",
      locale,
      note: reportNotes[locale],
      ...result,
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
