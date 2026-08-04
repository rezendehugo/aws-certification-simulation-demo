import type { Locale, Question, QuestionTranslation, QuestionTranslations } from "../types";

export function localizeQuestion(
  question: Question,
  locale: Locale,
  translations: QuestionTranslations,
): Question {
  if (locale === "en") return question;
  const translation = translations[question.id];
  if (!translation) return question;
  return {
    ...question,
    stem: translation.stem,
    explanation: translation.explanation,
    options: localizeOptions(question.options, translation.options),
    matchChoices: question.matchChoices
      ? localizeOptions(question.matchChoices, translation.matchChoices ?? {})
      : undefined,
  };
}

export function translationFor(
  questionId: string,
  translations: QuestionTranslations,
): QuestionTranslation | undefined {
  return translations[questionId];
}

function localizeOptions(
  options: Question["options"],
  translatedText: Record<string, string>,
): Question["options"] {
  return options.map((option) => ({
    ...option,
    text: translatedText[option.id] ?? option.text,
  }));
}
