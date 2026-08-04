import assert from "node:assert/strict";
import test from "node:test";
import rawQuestions from "../src/data/questions.json" with { type: "json" };
import rawTranslations from "../src/data/questions.pt-BR.json" with { type: "json" };
import { localizeQuestion } from "../src/domain/localization.ts";
import { answersEqual, resultFor } from "../src/domain/scoring.ts";
import { dictionaries } from "../src/i18n.ts";
import type { Question, QuestionTranslations } from "../src/types.ts";

const questions = rawQuestions as unknown as Question[];
const translations = rawTranslations as unknown as QuestionTranslations;

test("fixed mock has the exam allocation", () => {
  assert.equal(questions.length, 65);
  assert.equal(new Set(questions.map((question) => question.id)).size, 65);
  assert.equal(questions.filter((question) => question.scored).length, 50);
  assert.deepEqual(
    Object.fromEntries(
      [1, 2, 3, 4, 5].map((domainId) => [
        domainId,
        [
          questions.filter((question) => question.domainId === domainId).length,
          questions.filter((question) => question.domainId === domainId && question.scored).length,
        ],
      ]),
    ),
    { 1: [13, 10], 2: [15, 12], 3: [17, 14], 4: [10, 7], 5: [10, 7] },
  );
});

test("every answer references valid options", () => {
  for (const question of questions) {
    assert.ok(question.source.startsWith("https://github.com/nastaso/cloudcertprep/"));
    if (Array.isArray(question.correctAnswer)) {
      const ids = new Set(question.options.map((option) => option.id));
      for (const answer of question.correctAnswer) assert.ok(ids.has(answer));
    } else {
      const choices = new Set(question.matchChoices?.map((option) => option.id));
      for (const value of Object.values(question.correctAnswer)) assert.ok(choices.has(value));
    }
  }
});

test("Portuguese drafts cover the entire mock without changing answer identity", () => {
  assert.deepEqual(Object.keys(translations).sort(), questions.map((question) => question.id).sort());
  for (const question of questions) {
    const translation = translations[question.id];
    assert.ok(translation);
    assert.equal(translation.status, "machine-draft");
    assert.ok(translation.stem.trim().length > 0);
    assert.ok(translation.explanation.trim().length > 0);
    assert.deepEqual(Object.keys(translation.options).sort(), question.options.map((option) => option.id).sort());
    const localized = localizeQuestion(question, "pt-BR", translations);
    assert.deepEqual(localized.correctAnswer, question.correctAnswer);
    assert.deepEqual(localized.options.map((option) => option.id), question.options.map((option) => option.id));
    if (question.matchChoices) {
      assert.deepEqual(
        Object.keys(translation.matchChoices ?? {}).sort(),
        question.matchChoices.map((option) => option.id).sort(),
      );
    }
  }
});

test("selection, ordering and matching use exact scoring", () => {
  assert.equal(answersEqual({ type: "multiple_response", correctAnswer: ["A", "C"] } as never, ["C", "A"]), true);
  assert.equal(answersEqual({ type: "ordering", correctAnswer: ["A", "B"] } as never, ["B", "A"]), false);
  assert.equal(answersEqual({ type: "matching", correctAnswer: { A: "1", B: "2" } } as never, { B: "2", A: "1" }), true);
});

test("result excludes hidden unscored items", () => {
  const answers = Object.fromEntries(
    questions.map((question) => [question.id, { response: question.correctAnswer, flagged: false, confidence: "medium" }]),
  );
  const result = resultFor(questions as never, answers as never, "2026-01-01T00:00:00Z", "2026-01-01T01:00:00Z");
  assert.equal(result.score, 50);
  assert.equal(result.total, 50);
  assert.equal(result.unanswered, 0);
});

test("locale dictionaries have identical keys", () => {
  assert.deepEqual(Object.keys(dictionaries.en).sort(), Object.keys(dictionaries["pt-BR"]).sort());
});
