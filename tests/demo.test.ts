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

test("Portuguese keeps exam-critical distinctions and AWS product names recognizable", () => {
  assert.equal(translations["aif-q004"].options.D, "Acurácia (accuracy)");
  assert.match(translations["aif-q004"].explanation, /acurácia \(accuracy\)/i);
  assert.match(translations["aif-q025"].stem, /engenharia de prompts \(prompt engineering\)/i);
  assert.equal(translations["aif-q031"].options.B, "Preenchimento de imagem (inpainting)");
  assert.match(translations["aif-q011"].options.B, /Amazon SageMaker Feature Store/);
  assert.match(translations["aif-q011"].options.A, /Amazon SageMaker Data Wrangler/);
  assert.match(translations["aif-q011"].options.C, /Amazon SageMaker Clarify/);
  assert.match(translations["aif-q011"].options.D, /Amazon SageMaker Model Cards/);
  assert.match(translations["aif-q017"].stem, /aprendizado de máquina/);
  assert.doesNotMatch(translations["aif-q017"].explanation, /\b(registos|retalhista)\b/i);
  assert.match(translations["aif-q063"].options.C, /Embeddings/);
  assert.match(translations["aif-q070"].options.D, /acurácia \(accuracy\)/i);
  assert.match(translations["aif-q041"].stem, /acurácia \(accuracy\)/i);
  assert.match(translations["aif-q021"].explanation, /embeddings/i);
  assert.doesNotMatch(translations["aif-q031"].explanation, /\bPNL\b/i);
  assert.match(translations["aif-q458"].options.A, /^Aprendizado supervisionado/);
  assert.match(translations["aif-q029"].explanation, /prompt injection \(injeção de prompt\)/i);
  assert.match(translations["aif-q050"].options.D, /Provisioned Throughput \(throughput provisionado\)/);
  assert.match(translations["aif-q013"].options.A, /Internet gateway/);
  assert.match(translations["aif-q026"].options.A, /AWS Trusted Advisor/);
  assert.match(translations["aif-q026"].options.B, /Amazon Inspector/);
  assert.match(translations["aif-q028"].options.C, /AWS Artifact/);
  assert.match(translations["aif-q034"].options.D, /Amazon CloudWatch Logs/);
  assert.match(translations["aif-q034"].options.D, /monitorar viés \(bias\)/i);
  assert.match(translations["aif-q049"].stem, /viés \(bias\)/i);
  assert.match(translations["aif-q050"].explanation, /ajustado por fine-tuning/i);
  assert.match(translations["aif-q069"].explanation, /engenharia de prompts \(prompt engineering\)/i);
  assert.match(translations["aif-q038"].options.B, /Knowledge Base/);
  assert.match(translations["aif-q054"].options.B, /Amazon Bedrock Guardrails/);
  assert.match(translations["aif-q054"].options.C, /Amazon Bedrock Prompt Management/);
  assert.match(translations["aif-q074"].options.A, /Amazon Q Developer/);
  assert.match(translations["aif-q080"].stem, /Agents for Amazon Bedrock/);
  assert.match(translations["aif-q064"].options.B, /domain-adaptation fine-tuning/);
  assert.match(translations["aif-q040"].stem, /fine-tuning \(ajuste fino\)/);
  assert.match(translations["aif-q078"].stem, /fine-tuning/);
  assert.match(translations["aif-q069"].options.B, /retrieval-augmented generation/);
  assert.match(translations["aif-q030"].options.B, /foundation model, FM/);
  assert.match(translations["aif-q026"].stem, /foundation models, FMs/);
  assert.doesNotMatch(translations["aif-q009"].options.A, /engenharia imediata/i);
  assert.match(translations["aif-q020"].options.D, /natural language processing, NLP/);
  assert.match(translations["aif-q002"].stem, /grande modelo de linguagem \(large language model, LLM\)/i);
  assert.doesNotMatch(JSON.stringify(translations), /modelo de linguagem ampla/i);
  assert.match(translations["aif-q006"].explanation, /latência quase em tempo real/i);
  assert.match(translations["aif-q457"].options.B, /engenharia de atributos/i);
  assert.match(translations["aif-q457"].options.D, /^Defina /);
});

test("Portuguese drafts preserve AWS service names and avoid known literal calques", () => {
  const serviceNamePattern = /\b(?:Amazon|AWS)\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){0,3}/g;
  const knownCalques = /engenharia imediata|modelo fundacional|modelos fundacionais|modelo básico|modelos básicos|taxa de transferência|Amazon Personalizar|Cloud Front|Incorporações|\bPNL\b/i;

  for (const question of questions) {
    const translation = translations[question.id];
    const pairs = [
      [question.stem, translation.stem],
      ...question.options.map((option) => [option.text, translation.options[option.id]]),
      [question.explanation, translation.explanation],
    ];
    const localizedText = pairs.map(([, localized]) => localized).join(" ");
    assert.doesNotMatch(localizedText, knownCalques, `${question.id} contains a known literal technical calque`);

    for (const [source, localized] of pairs) {
      for (const name of new Set(source.match(serviceNamePattern) ?? [])) {
        const distinguishingWords = name
          .replace(/^(Amazon|AWS)\s+/, "")
          .split(/\s+/)
          .filter((word) => word.length > 3);
        const missing = distinguishingWords.filter((word) => !new RegExp(`\\b${word}\\b`).test(localized));
        assert.deepEqual(missing, [], `${question.id} translates or drops part of AWS name “${name}”`);
      }
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
