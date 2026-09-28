import assert from "node:assert/strict";
import test from "node:test";
import rawQuestions from "../src/data/questions.json" with { type: "json" };
import rawTranslations from "../src/data/questions.pt-BR.json" with { type: "json" };
import { localizeQuestion } from "../src/domain/localization.ts";
import { answersEqual, resultFor } from "../src/domain/scoring.ts";
import { jsonReport, markdownReport } from "../src/domain/report.ts";
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
  assert.match(translations["aif-q011"].stem, /aprendizado de máquina \(machine learning, ML\)/i);
  assert.match(translations["aif-q011"].explanation, /atributos \(features\) de aprendizado de máquina \(machine learning\)/i);
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
  assert.match(translations["aif-q050"].explanation, /invocar um modelo personalizado.*Provisioned Throughput/i);
  assert.match(translations["aif-q069"].explanation, /engenharia de prompts \(prompt engineering\)/i);
  assert.match(translations["aif-q038"].options.B, /Knowledge Base/);
  assert.match(translations["aif-q054"].options.B, /Amazon Bedrock Guardrails/);
  assert.match(translations["aif-q054"].options.C, /Amazon Bedrock Prompt Management/);
  assert.match(translations["aif-q074"].options.A, /Amazon Q Developer/);
  assert.equal(translations["aif-q074"].options.B, "Amazon Q in Amazon QuickSight");
  assert.match(translations["aif-q080"].stem, /Agents for Amazon Bedrock/);
  assert.match(translations["aif-q064"].options.B, /domain-adaptation fine-tuning/);
  assert.match(translations["aif-q040"].stem, /ajuste fino \(fine-tuning\)/);
  assert.match(translations["aif-q078"].stem, /fine-tuning/);
  assert.match(translations["aif-q069"].options.B, /retrieval-augmented generation/);
  assert.match(translations["aif-q030"].options.B, /foundation model, FM/);
  assert.match(translations["aif-q026"].stem, /foundation models, FMs/);
  assert.doesNotMatch(translations["aif-q009"].options.A, /engenharia imediata/i);
  assert.match(translations["aif-q020"].options.D, /natural language processing, NLP/);
  assert.match(translations["aif-q002"].stem, /grande modelo de linguagem \(large language model, LLM\)/i);
  assert.doesNotMatch(JSON.stringify(translations), /modelo de linguagem ampla/i);
  assert.doesNotMatch(JSON.stringify(translations), /modelo de linguagem grande|modelos de linguagem grande|rendimento provisionado/i);
  assert.match(translations["aif-q010"].explanation, /modelos de linguagem de pequeno porte \(small language models, SLMs\)/i);
  assert.match(translations["aif-q019"].options.B, /completion \(saída esperada\)/i);
  assert.match(translations["aif-q019"].explanation, /completion \(saída esperada\)/i);
  assert.match(translations["aif-q014"].explanation, /sem precisar coletar dados nem treinar e implantar um modelo/i);
  assert.match(translations["aif-q050"].options.A, /endpoint do Amazon SageMaker AI/i);
  assert.match(translations["aif-q038"].options.B, /Knowledge Bases for Amazon Bedrock/);
  assert.doesNotMatch(translations["aif-q042"].explanation, /rastreamento mede/i);
  assert.match(translations["aif-q042"].stem, /chatbot baseado em um grande modelo de linguagem/i);
  assert.match(translations["aif-q005"].options.B, /^Aumente /);
  assert.match(translations["aif-q005"].options.C, /^Aprimore o prompt$/);
  assert.match(translations["aif-q005"].options.D, /^Aumente /);
  assert.match(translations["aif-q007"].options.A, /^Aumente /);
  assert.match(translations["aif-q007"].options.C, /^Diminua /);
  assert.match(translations["aif-q006"].explanation, /latência quase em tempo real/i);
  assert.match(translations["aif-q027"].stem, /ajustar automaticamente a capacidade à demanda/i);
  assert.match(translations["aif-q035"].options.D, /generative pre-trained transformer, GPT/i);
  assert.match(translations["aif-q055"].explanation, /generative adversarial network, GAN/i);
  assert.match(translations["aif-q077"].options.B, /Alucinação \(hallucination\)/i);
  assert.match(translations["aif-q077"].explanation, /sobreajuste \(overfitting\).*generaliza mal para dados novos/i);
  assert.match(translations["aif-q077"].explanation, /subajuste \(underfitting\).*desempenho ruim até nos dados de treinamento/i);
  assert.match(translations["aif-q077"].explanation, /alucinação \(hallucination\).*plausível.*incorreto/i);
  assert.match(translations["aif-q001"].explanation, /atributos de entrada \(features\)/i);
  assert.match(translations["aif-q016"].stem, /chamadas telefônicas gravadas/i);
  assert.match(translations["aif-q013"].explanation, /endpoint de interface da VPC.*sem usar um gateway de internet/i);
  assert.match(translations["aif-q057"].options.B, /Viés de amostragem \(sampling bias\)/i);
  assert.match(translations["aif-q066"].explanation, /função de serviço do Amazon Bedrock exclusiva para cada equipe/i);
  assert.match(translations["aif-q037"].options.B, /aumento de dados \(data augmentation\)/i);
  assert.match(translations["aif-q065"].options.C, /^Diminua o valor da temperatura/);
  assert.match(translations["aif-q012"].options.C, /referências às fontes.*licenças de código aberto/i);
  assert.match(translations["aif-q018"].options.B, /embeddings multimodais \(multimodal embedding model\)/i);
  assert.match(translations["aif-q018"].explanation, /mesmo espaço vetorial/i);
  assert.match(translations["aif-q018"].stem, /modelo de base \(foundation model, FM\)/i);
  assert.match(translations["aif-q022"].options.C, /^Gerar imagens fotorrealistas/);
  assert.match(translations["aif-q006"].options.D, /Inferência assíncrona \(asynchronous inference\)/i);
  assert.match(translations["aif-q014"].options.C, /aprendizado por reforço \(reinforcement learning\)/i);
  assert.match(translations["aif-q020"].options.B, /detecção de anomalias \(anomaly detection\)/i);
  assert.match(translations["aif-q458"].options.B, /aprendizado não supervisionado \(unsupervised learning/i);
  assert.match(translations["aif-q010"].options.C, /de forma assíncrona/i);
  assert.match(translations["aif-q010"].explanation, /chamadas sejam assíncronas/i);
  assert.match(translations["aif-q014"].stem, /bolas de gude/);
  assert.match(translations["aif-q015"].stem, /execução \(runtime\)/i);
  assert.match(translations["aif-q020"].stem, /IP de origem de uma solicitação recebida/i);
  assert.match(translations["aif-q025"].options.C, /few-shot prompting/i);
  assert.match(translations["aif-q025"].options.B, /zero-shot/i);
  assert.match(translations["aif-q029"].options.B, /top-p/);
  assert.doesNotMatch(translations["aif-q029"].options.B, /P superior/i);
  assert.match(translations["aif-q029"].stem, /induzam o agente a executar.*revelem suas instruções/i);
  assert.match(translations["aif-q029"].options.C, /prompt do sistema \(system prompt\).*template de prompt \(prompt template\)/i);
  assert.match(translations["aif-q029"].explanation, /prompt do sistema \(system prompt\)/i);
  assert.match(translations["aif-q029"].explanation, /não garante que o modelo resistirá.*nem mantém as instruções internas em segredo/i);
  assert.match(translations["aif-q029"].explanation, /Amazon Bedrock Guardrails/);
  assert.match(translations["aif-q080"].options.B, /foundation model, FM/i);
  assert.match(translations["aif-q080"].explanation, /^O recurso Agents for Amazon Bedrock automatiza/);
  assert.match(translations["aif-q016"].explanation, /desvios \(drift\)/i);
  assert.match(translations["aif-q017"].explanation, /neste cenário não há dados rotulados/i);
  assert.match(translations["aif-q027"].explanation, /encaminha solicitações a um serviço de back-end/i);
  assert.match(translations["aif-q031"].explanation, /visão computacional \(computer vision\)/i);
  assert.match(translations["aif-q031"].explanation, /preenchimento de imagem \(inpainting\)/i);
  assert.match(translations["aif-q046"].explanation, /geração aumentada por recuperação \(retrieval-augmented generation, RAG\)/i);
  assert.match(translations["aif-q003"].explanation, /lógica interna pouco transparente/i);
  assert.match(translations["aif-q030"].explanation, /parcela cada vez maior da responsabilidade fica com o provedor/i);
  assert.doesNotMatch(translations["aif-q030"].explanation, /menos propriedade à empresa/i);
  assert.match(translations["aif-q063"].explanation, /itens semelhantes ficam próximos/i);
  assert.match(translations["aif-q063"].explanation, /processamento de linguagem natural \(NLP\)/i);
  assert.match(translations["aif-q008"].explanation, /revisores especializados, que os verificam e corrigem/i);
  assert.match(translations["aif-q025"].explanation, /melhorar a acurácia ao classificar/i);
  assert.match(translations["aif-q458"].explanation, /não depende de um conjunto fixo de exemplos rotulados/i);
  assert.match(translations["aif-q024"].options.A, /^Teste e aprimore o prompt/);
  assert.match(translations["aif-q041"].options.C, /épocas \(epochs\)/i);
  assert.match(translations["aif-q070"].options.D, /conjunto de dados de referência \(benchmark dataset\)/i);
  assert.match(translations["aif-q001"].options.C, /partial dependence plots, PDPs/i);
  assert.equal(translations["aif-q001"].options.D, "Código-fonte usado para treinar o modelo");
  assert.match(translations["aif-q049"].stem, /novos solicitantes de crédito/);
  assert.doesNotMatch(translations["aif-q049"].stem, /candidatos/);
  assert.match(translations["aif-q003"].options.B, /árvores de decisão \(decision trees\)/i);
  assert.match(translations["aif-q037"].options.B, /classes pouco representadas \(underrepresented classes\)/i);
  assert.match(translations["aif-q037"].explanation, /classes pouco representadas/i);
  assert.match(translations["aif-q037"].options.C, /épocas \(epochs\)/i);
  assert.match(translations["aif-q047"].stem, /large language model, LLM/i);
  assert.match(translations["aif-q054"].stem, /conteúdo apropriado para crianças/i);
  assert.match(translations["aif-q061"].options.C, /model invocation logging/i);
  assert.match(translations["aif-q061"].explanation, /model invocation logging/i);
  assert.match(translations["aif-q457"].options.B, /engenharia de atributos/i);
  assert.match(translations["aif-q457"].options.D, /^Defina /);
});

test("Portuguese drafts preserve AWS service names and avoid known literal calques", () => {
  const serviceNamePattern = /\b(?:Amazon|AWS)\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){0,3}/g;
  const knownCalques = /engenharia imediata|modelo fundacional|modelos fundacionais|modelo básico|modelos básicos|taxa de transferência|rendimento provisionado|Amazon Personalizar|Cloud Front|incorporaç[aã]|\bPNL\b/i;

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

test("Portuguese expands ML in every standalone translated question", () => {
  for (const [questionId, translation] of Object.entries(translations)) {
    const localizedText = [
      translation.stem,
      ...Object.values(translation.options),
      translation.explanation,
      ...Object.values(translation.matchChoices ?? {}),
    ].join(" ");
    if (/\bML\b/.test(localizedText)) {
      assert.match(localizedText, /machine learning/i, `${questionId} should expand ML`);
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
  assert.equal(dictionaries["pt-BR"].readiness, "Referência de estudo: 80%");
  assert.match(dictionaries["pt-BR"].legalIndependent, /marcas comerciais da Amazon\.com, Inc\./);
  assert.match(dictionaries["pt-BR"].legalAttribution, /Direitos autorais © 2026/);
});

test("learner-facing Portuguese reports use domain names and localized empty states", () => {
  const question = questions[0]!;
  const result = {
    score: 0,
    total: 1,
    percentage: 0,
    unanswered: 1,
    elapsedSeconds: 0,
    domainScores: [{ domainId: question.domainId, correct: 0, total: 1, percentage: 0 }],
  };
  const markdown = markdownReport(result, [question], {}, "pt-BR");
  const json = JSON.parse(jsonReport(result, "pt-BR")) as { domainScores: Array<Record<string, unknown>> };

  assert.match(markdown, /Fundamentos de IA e ML/);
  assert.match(markdown, /Questões para revisar/);
  assert.match(markdown, /Percentual bruto de acertos neste simulado; não equivale à pontuação em escala da AWS/);
  assert.match(markdown, /- Nenhuma/);
  assert.doesNotMatch(markdown, /Domínio\s+1\b|Objective\s+1\.3|\bEvidence\b|\bNone\b/);
  assert.equal(json.domainScores[0]?.domain, "Fundamentos de IA e ML");
  assert.equal("domainId" in (json.domainScores[0] ?? {}), false);
});
