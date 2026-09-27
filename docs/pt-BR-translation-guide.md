# PT-BR translation guide for exam learning

The Portuguese edition should teach the concept in natural Brazilian Portuguese while helping learners recognize the English wording used in AWS exams and documentation. It is not a word-for-word mirror. Conceptual correctness and preserving the answer distinction come before literalness.

## Editorial rules

- Write for Brazilian learners: use **aprendizado de máquina**, **usuário**, **registro**, and natural Brazilian sentence order. Avoid European Portuguese forms such as *aprendizagem* when *aprendizado* is intended, and *registo*.
- Preserve AWS service, product, feature, API, and certification names exactly as AWS writes them (for example, **Amazon SageMaker Feature Store**, **Amazon SageMaker Data Wrangler**, **Amazon Bedrock**, **Amazon S3**, **AIF-C01**). Do not translate a brand name into a made-up Portuguese product name.
- Keep familiar acronyms likely to appear in the exam. Expand in Portuguese on first use where useful, with the English expansion when that helps recognition (for example, **processamento de linguagem natural (natural language processing, NLP)**).
- Keep English terms alongside Portuguese when a direct translation is ambiguous, uncommon, or materially different from exam vocabulary. Prefer **acurácia (accuracy)** over **precisão** for the share of all predictions that are correct. Reserve **precisão (precision)** for the positive predictive-value metric. Include the English term when needed to make the distinction unmistakable.
- Use official AWS Brazilian Portuguese exam and service documentation as terminology references, not as sources for new question content. AWS localized pages may vary; when a translation could collapse two exam concepts, retain the English term and explain the distinction.
- Preserve quantities, units, negation, qualifiers (such as *least*, *most*, *near real-time*), scope, and causal relationships. Never make a distractor weaker or the correct option more obvious through translation.
- Translate explanations as teaching material: explain why the right choice fits, then distinguish each distractor accurately. Do not introduce unsupported claims or silently modernize a service name from the source question.
- Keep terminology consistent across questions, options, explanations, interface, and downloadable reports.

## Starter glossary

| English exam term | PT-BR treatment |
| --- | --- |
| accuracy | **acurácia (accuracy)**; do not use *precisão* when it means correctness across all predictions |
| precision | **precisão (precision)**; positive predictive value |
| recall | **revocação (recall)**; retain *recall* in parentheses |
| machine learning (ML) | **aprendizado de máquina (ML)** |
| inference | **inferência**; retain *inference* when contrasting AWS inference modes |
| latency | **latência** |
| feature / feature engineering | **atributo (feature)** / **engenharia de atributos (feature engineering)** when the ML meaning is intended |
| Feature Store | AWS product name; never translate |
| Knowledge Bases for Amazon Bedrock | Keep the AWS feature name in English; explain as **base de conhecimento do Amazon Bedrock** |
| Agents for Amazon Bedrock | Keep the feature name in English; explain as **agentes do Amazon Bedrock** |
| Guardrails / Prompt Management | Preserve these Amazon Bedrock feature names; explain their function in Portuguese |
| foundation model (FM) | **modelo de base (foundation model, FM)** |
| fine-tuning | **ajuste fino (fine-tuning)** |
| prompt / prompt engineering | **prompt** / **engenharia de prompts (prompt engineering)** |
| prompt injection | **prompt injection (injeção de prompt)**; do not translate *prompt* as *imediato* |
| few-shot / zero-shot | **few-shot (com exemplos)** / **zero-shot (sem exemplos)**; retain exam terms on first mention |
| Provisioned Throughput (Amazon Bedrock) | Keep the product term **Provisioned Throughput (throughput provisionado)**; avoid *taxa de transferência*, which can imply network bandwidth |
| inpainting | **preenchimento de imagem (inpainting)** |
| embeddings | **embeddings (representações vetoriais)**; avoid literal *incorporações* |
| hallucination | **alucinação (hallucination)** |
| bias / fairness | **viés (bias)** / **equidade (fairness)**; retain English if the distinction is tested |
| data leakage | **vazamento de dados (data leakage)** |
| epoch | **época de treinamento (epoch)** on first use |
| batch transform | **transformação em lote (batch transform)**; retain English when comparing named inference options |
| real-time / asynchronous / serverless inference | **inferência em tempo real / assíncrona / sem servidor**; retain English mode names when useful for exam mapping |
| Internet gateway | **Internet gateway (gateway da internet)** when referring to the AWS networking feature |
| least privilege | **princípio do menor privilégio (least privilege)** |
| benchmark dataset | **conjunto de dados de benchmark (benchmark dataset)** |
| top-k / top-p | Keep the parameter names **top-k** and **top-p**; explain their effect in Portuguese |
| domain-adaptation fine-tuning | **ajuste fino com adaptação de domínio (domain-adaptation fine-tuning)** |

## Review and trust labels

Every record stays `machine-draft` until a human checks the complete stem, every option, and explanation against its English source. `human-reviewed` records identify the reviewer and review date. Use `aws-verified` only when AWS has actually verified that translation; a link to AWS documentation alone is not verification. Do not present the Portuguese edition as fully reviewed while any learner-facing question remains a draft.

When a translation error may change the correct answer, treat it as a high-priority content issue and correct the complete item—not only the option that exposed it. Preserve answer IDs and scoring keys.

## Reference sources

- [AWS Certified AI Practitioner exam guide in Brazilian Portuguese](https://docs.aws.amazon.com/pt_br/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- [AWS machine-learning model-accuracy documentation](https://docs.aws.amazon.com/pt_br/machine-learning/latest/dg/evaluating-model-accuracy.html)
- [AWS machine-learning terminology, including precision](https://docs.aws.amazon.com/pt_br/machine-learning/latest/dg/amazon-machine-learning-key-concepts.html)
- [Amazon SageMaker Feature Store documentation](https://docs.aws.amazon.com/pt_br/sagemaker/latest/dg/feature-store.html)
- [Amazon Bedrock Provisioned Throughput prerequisites](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/prov-thru-prereq.html)
