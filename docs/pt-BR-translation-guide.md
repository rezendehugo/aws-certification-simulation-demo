# PT-BR translation guide for exam learning

The Portuguese edition should teach the concept in natural Brazilian Portuguese while helping learners recognize the English wording used in AWS exams and documentation. It is not a word-for-word mirror. Conceptual correctness and preserving the answer distinction come before literalness.

## Editorial rules

- Write for Brazilian learners: use **aprendizado de máquina**, **usuário**, **registro**, and natural Brazilian sentence order. Avoid European Portuguese forms such as *aprendizagem* when *aprendizado* is intended, and *registo*.
- Preserve AWS service, product, feature, API, and certification names exactly as AWS writes them (for example, **Amazon SageMaker Feature Store**, **Amazon SageMaker Data Wrangler**, **Amazon Bedrock**, **Amazon S3**, **AIF-C01**). Do not translate a brand name into a made-up Portuguese product name.
- Keep familiar acronyms likely to appear in the exam. Expand in Portuguese on first use where useful, with the English expansion when that helps recognition (for example, **processamento de linguagem natural (natural language processing, NLP)**).
- Prefer **grande modelo de linguagem (large language model, LLM)**, a term used in AWS documentation; do not translate *large* as *ampla*, which can suggest breadth rather than model scale.
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
| root mean squared error (RMSE) | **raiz do erro quadrático médio (RMSE)**; preserve the natural Portuguese word order |
| machine learning (ML) | **aprendizado de máquina (ML)** |
| inference | **inferência**; retain *inference* when contrasting AWS inference modes |
| latency | **latência** |
| runtime | **execução do modelo (runtime)** when distinguishing deployed operation from training |
| feature / feature engineering | **atributo (feature)** / **engenharia de atributos (feature engineering)** when the ML meaning is intended; avoid translating *feature* as *recurso* in this context |
| large language model (LLM) | **grande modelo de linguagem (large language model, LLM)**; avoid *modelo de linguagem ampla* |
| small language model (SLM) | **modelo de linguagem de pequeno porte (small language model, SLM)**; keep **SLM** distinct from **LLM** |
| generative adversarial network (GAN) | **rede adversarial generativa (generative adversarial network, GAN)**; explain generator and discriminator roles in Portuguese |
| generative pre-trained transformer (GPT) | **transformador generativo pré-treinado (generative pre-trained transformer, GPT)**; retain the English expansion when the acronym is relevant |
| Feature Store | AWS product name; never translate |
| Knowledge Bases for Amazon Bedrock | Keep the AWS feature name in English; explain as **base de conhecimento do Amazon Bedrock** |
| Agents for Amazon Bedrock | Keep the feature name in English; explain as **agentes do Amazon Bedrock** |
| Guardrails / Prompt Management | Preserve these Amazon Bedrock feature names; explain their function in Portuguese |
| foundation model (FM) | **modelo de base (foundation model, FM)** |
| fine-tuning | **ajuste fino (fine-tuning)** |
| prompt / prompt engineering | **prompt** / **engenharia de prompts (prompt engineering)** |
| prompt injection | **prompt injection (injeção de prompt)**; do not translate *prompt* as *imediato* |
| system prompt | **prompt do sistema (system prompt)**; instructions or context for the model, distinct from an individual user's request |
| few-shot / zero-shot | **few-shot (com poucos exemplos)** / **zero-shot (sem exemplos)**; retain exam terms on first mention |
| Provisioned Throughput (Amazon Bedrock) | Keep the product term **Provisioned Throughput (throughput provisionado)**; avoid *taxa de transferência*, which can imply network bandwidth |
| inpainting | **preenchimento de imagem (inpainting)** |
| embeddings | Prefer **embeddings (representações vetoriais)** on first use to preserve exam mapping. AWS Portuguese docs sometimes use **incorporação**; if used, pair it with *embeddings* so learners can recognize the English term. |
| token | Keep **token**; define it as a unit of meaning that may be a word, part of a word, or punctuation mark. |
| hallucination | **alucinação (hallucination)** |
| overfitting | **sobreajuste (overfitting)**; good performance on training data but poor generalization to new data |
| underfitting | **subajuste (underfitting)**; fails to learn useful patterns and performs poorly even on training data |
| underrepresented classes | **classes pouco representadas (underrepresented classes)**; avoid the unnecessary calque *classes sub-representadas* |
| bias / fairness | **viés (bias)** / **equidade (fairness)**; retain English if the distinction is tested |
| bias assessment / mitigation / transparency | Distinguish **assessing or detecting bias**, **mitigating it** (intervening to reduce it), and **transparency** (making behavior and limitations visible). Assessment and disclosure alone do not eliminate bias. |
| interpretability / explainability | **interpretabilidade (interpretability)** / **explicabilidade (explainability)**; as an editorial distinction, the first describes how understandable a model's logic is, while the second describes giving reasons for its predictions. Usage can overlap; preserve the source term rather than imposing a universal boundary. |
| measurement / sampling bias | **viés de medição (measurement bias)** / **viés de amostragem (sampling bias)**; preserve distinctions between bias sources |
| data augmentation | **aumento de dados (data augmentation)**; distinguish it from merely collecting more data |
| partial dependence plot (PDP) | **gráfico de dependência parcial (partial dependence plot, PDP)**; explain that it shows how input features relate to predictions |
| data leakage | **vazamento de dados (data leakage)** |
| epoch | **época de treinamento (epoch)** on first use |
| batch transform | **transformação em lote (batch transform)**; retain English when comparing named inference options |
| real-time / asynchronous / serverless inference | **inferência em tempo real / assíncrona / sem servidor**; retain English mode names when useful for exam mapping |
| Internet gateway | **Internet gateway (gateway da internet)** when referring to the AWS networking feature |
| least privilege | **princípio do menor privilégio (least privilege)** |
| benchmark dataset | **conjunto de dados de referência (benchmark dataset)** |
| top-k / top-p | Keep the parameter names **top-k** and **top-p**; explain their effect in Portuguese |
| domain-adaptation fine-tuning | **ajuste fino com adaptação de domínio (domain-adaptation fine-tuning)** |

## Review and trust labels

Every record stays `machine-draft` until a human checks the complete stem, every option, and explanation against its English source. `human-reviewed` records identify the reviewer and review date. Use `aws-verified` only when AWS has actually verified that translation; a link to AWS documentation alone is not verification. Do not present the Portuguese edition as fully reviewed while any learner-facing question remains a draft.

When a translation error may change the correct answer, treat it as a high-priority content issue and correct the complete item—not only the option that exposed it. Preserve answer IDs and scoring keys.

## Source-content issues requiring resolution

- **aif-q009 — locally corrected source discrepancy:** The upstream source says SSE-S3, but its keyed answer requires KMS decryption permission. AWS documents that `kms:Decrypt` is needed when S3 data sources use a KMS key; SSE-S3 uses Amazon S3-managed service keys. The demo adaptation now specifies SSE-KMS, states that S3 read access is already granted, and retains keyed answer C with explicit `kms:Decrypt` wording. This changes the upstream-derived English item as well as its PT-BR translation; it is not an AWS-verified translation. Keep the translation `machine-draft` until a human reviews both versions. See [Bedrock data-source encryption](https://docs.aws.amazon.com/bedrock/latest/userguide/encryption-kb.html) and [KMS permissions for S3 objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html).
- **aif-q008:** The keyed option recommends Amazon SageMaker Ground Truth Plus for high-quality labels. AWS states that support for Ground Truth Plus ended on June 30, 2026, and that Ground Truth stopped accepting new customers on July 30, 2026. The PT-BR explanation distinguishes the tested concept (human review) from these no-longer-available services; it preserves the keyed answer and remains a draft pending human review and source reconciliation. See the [AWS SageMaker AI end-of-support notice](https://aws.amazon.com/sagemaker/ai/features/) and [official AIF-C01 exam guide](https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf).
- **aif-q016:** The stated goal is to analyze recorded calls and extract key points, but the keyed option only says to convert audio to text with standard Amazon Transcribe. A transcript enables later analysis; it does not itself fulfill an automated key-point extraction requirement. Amazon Transcribe Call Analytics offers separate post-call insights, including issues, outcomes, action items, and optional generative call summarization. Clarify whether manual analysis of a transcript is sufficient or whether the question intends Call Analytics. Keep the Portuguese item `machine-draft` and preserve the source answer until clarified. See [Amazon Transcribe post-call analytics](https://docs.aws.amazon.com/transcribe/latest/dg/call-analytics-batch.html) and [call summarization](https://docs.aws.amazon.com/transcribe/latest/dg/tca-enable-summarization.html).

## Reference sources

- [AWS Certified AI Practitioner exam guide in Brazilian Portuguese](https://docs.aws.amazon.com/pt_br/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- [AWS machine-learning model-accuracy documentation](https://docs.aws.amazon.com/pt_br/machine-learning/latest/dg/evaluating-model-accuracy.html)
- [AWS machine-learning terminology, including precision](https://docs.aws.amazon.com/pt_br/machine-learning/latest/dg/amazon-machine-learning-key-concepts.html)
- [Amazon SageMaker Feature Store documentation](https://docs.aws.amazon.com/pt_br/sagemaker/latest/dg/feature-store.html)
- [Amazon Bedrock Provisioned Throughput prerequisites](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/prov-thru-prereq.html)
- [Cohere Embed v4 multimodal embeddings](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/model-parameters-embed-v4.html)

When explaining the effect of more training epochs, distinguish improvement on training data from generalization. Compare training and validation curves: training accuracy rising while validation accuracy falls can indicate overfitting. See AWS's example on [training and validation curves](https://docs.aws.amazon.com/sagemaker/latest/dg/train-valid-curve.html).

For `aif-q057`, an outcome disparity across groups does not, by itself, identify the cause of bias. Sampling bias presupposes underrepresentation in the sample; systematic collection or recording errors can be measurement bias. Because the source stem does not describe the sample or collection process, preserve the keyed answer as the source's interpretation, state its premise, and keep the translation in draft until the item is clarified. AWS describes both underrepresentation and biased labels as possible sources of training-data bias in its [pre-training bias documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-data-bias.html).
