# Guia de tradução para português brasileiro

## Objetivo editorial

A versão em português deve explicar o conceito com naturalidade para quem estuda no Brasil e, ao mesmo tempo, ajudar a reconhecer os termos em inglês usados nas provas e na documentação da AWS. Não fazemos tradução palavra por palavra: a correção conceitual e a preservação da distinção avaliada vêm primeiro.

## Como traduzir

- Use português brasileiro natural: **aprendizado de máquina**, **usuário**, **registro**. Evite formas do português europeu, como *aprendizagem* quando o sentido for *machine learning* e *registo*.
- Preserve sem alterações nomes de serviços, produtos, recursos, APIs e certificações da AWS, como **Amazon SageMaker Feature Store**, **Amazon Bedrock**, **Amazon S3** e **AIF-C01**.
- Na primeira menção, escreva o termo em português seguido do termo de prova em inglês quando isso ajudar o reconhecimento: **aprendizado de máquina (machine learning, ML)**, **grande modelo de linguagem (large language model, LLM)**.
- Não traduza *large* como *amplo*: para *large language model*, use **grande modelo de linguagem**. Mantenha **LLM** distinto de **SLM** (*small language model*, modelo de linguagem de pequeno porte).
- Distinga métricas com cuidado: **acurácia (accuracy)** é a proporção geral de previsões corretas; **precisão (precision)** é o valor preditivo positivo; **revocação (recall)** deve vir acompanhada de *recall* quando necessário para evitar ambiguidade.
- Preserve termos de prova em inglês quando uma tradução direta for rara, ambígua ou puder misturar conceitos. Por exemplo: **embeddings (representações vetoriais)**, **prompt injection (injeção de prompt)**, **few-shot (com poucos exemplos)** e **zero-shot (sem exemplos)**.
- Mantenha quantidades, unidades, negações e qualificadores como *least*, *most* e *near real-time*. Não enfraqueça um distrator nem torne a resposta correta mais óbvia.
- Na explicação, diga por que a opção correta atende ao cenário e por que cada alternativa não atende. Não acrescente afirmações sem suporte nem atualize silenciosamente o nome de um serviço citado na fonte.

## Glossário inicial

| Termo em inglês | Forma recomendada em PT-BR |
| --- | --- |
| accuracy / precision / recall | **acurácia (accuracy)** / **precisão (precision)** / **revocação (recall)** |
| bias / fairness | **viés (bias)** / **equidade (fairness)**; não trate os dois conceitos como sinônimos |
| interpretability / explainability | **interpretabilidade (interpretability)** / **explicabilidade (explainability)**; como distinção editorial, a primeira descreve quão compreensível é a lógica do modelo, e a segunda, a produção de razões para suas previsões. O uso pode se sobrepor; preserve a palavra da fonte em vez de impor uma separação universal. |
| root mean squared error (RMSE) | **raiz do erro quadrático médio (RMSE)**; preserve a ordem natural em português |
| machine learning (ML) | **aprendizado de máquina (machine learning, ML)** |
| feature / feature engineering | **atributo (feature)** / **engenharia de atributos (feature engineering)** no contexto de ML |
| foundation model (FM) | **modelo de base (foundation model, FM)** |
| fine-tuning | **ajuste fino (fine-tuning)** |
| overfitting | **sobreajuste (overfitting)**: bom desempenho nos dados de treinamento, mas generalização ruim para dados novos |
| underfitting | **subajuste (underfitting)**: dificuldade para aprender os padrões, com desempenho ruim até nos dados de treinamento |
| underrepresented classes | **classes pouco representadas (underrepresented classes)**; evite o decalque desnecessário *classes sub-representadas* |
| completion (em dados de fine-tuning) | Manter o nome do campo **completion** e explicar como **saída esperada**; não restringir a tradução a “resposta” |
| prompt engineering / prompt injection | **engenharia de prompts (prompt engineering)** / **prompt injection (injeção de prompt)** |
| system prompt | **prompt do sistema (system prompt)**; contém instruções ou contexto para o modelo, distintos da solicitação individual do usuário |
| few-shot prompting | **few-shot prompting (prompts com poucos exemplos)**; o modelo recebe alguns pares de entrada e saída ou exemplos rotulados antes de responder a uma nova entrada |
| embeddings | **embeddings (representações vetoriais)** |
| token | **token**; unidade de significado que pode ser uma palavra, parte de palavra ou sinal de pontuação; preserve o termo cobrado em inglês |
| benchmark dataset | **conjunto de dados de referência (benchmark dataset)** |
| Provisioned Throughput | Manter **Provisioned Throughput (throughput provisionado)**; não usar *taxa de transferência* |
| data leakage / data augmentation | **vazamento de dados (data leakage)** / **aumento de dados (data augmentation)** |
| real-time / asynchronous inference | **inferência em tempo real** / **inferência assíncrona**; manter o inglês ao comparar modalidades |
| least privilege | **princípio do menor privilégio (least privilege)** |

Não confunda **alucinação** com sobreajuste ou subajuste: alucinação é uma saída plausível, mas incorreta ou inventada; sobreajuste e subajuste descrevem como o modelo aprende e generaliza a partir dos dados.

## Revisão e transparência

Uma tradução só pode passar de `machine-draft` para `human-reviewed` depois que uma pessoa comparar o enunciado completo, todas as opções e a explicação com a fonte em inglês. A revisão deve informar o nome real de quem revisou e a data em formato ISO. Alterações assistidas por ferramentas continuam como rascunho até essa conferência humana. Use `aws-verified` somente se a própria AWS tiver verificado a tradução — consultar documentação da AWS não equivale a essa verificação.

Não altere IDs das opções nem a chave de resposta ao traduzir. Se o texto-fonte parecer tecnicamente inconsistente, registre a questão e peça esclarecimento; não “corrija” silenciosamente a resposta.

### Pendência conhecida na fonte

O item `aif-q009` diz que os objetos do Amazon S3 usam chaves gerenciadas pelo S3 (**SSE-S3**), mas a resposta e a explicação pressupõem permissão para descriptografar uma chave. A documentação da AWS distingue SSE-S3 de SSE-KMS; a permissão `kms:Decrypt` se aplica ao segundo caso. Essa inconsistência precisa ser resolvida na fonte antes de qualquer tradução ser aprovada. Consulte as orientações de [permissões do S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/troubleshoot-403-errors.html) e de [permissões para Knowledge Bases do Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-permissions.html).

O item `aif-q008` recomenda o Amazon SageMaker Ground Truth Plus para obter rótulos de alta qualidade. A AWS informa que encerrou o suporte ao Ground Truth Plus em 30 de junho de 2026 e que recursos do SageMaker AI, incluindo Ground Truth Plus, deixaram de estar disponíveis para novos clientes. Na conferência feita em 28/09/2026, isso torna a recomendação da fonte inadequada como orientação atual de implementação. Preserve a identidade da resposta por enquanto, mantenha a tradução como `machine-draft` e peça ao responsável pela fonte que a reconcilie com a revisão do guia de exame pretendida antes da aprovação. Consulte o [aviso de encerramento de suporte do SageMaker AI](https://aws.amazon.com/sagemaker/ai/features/).

O item `aif-q016` pede análise de chamadas gravadas e extração dos pontos principais, mas a resposta indicada cita apenas a conversão do áudio em texto pelo Amazon Transcribe padrão. A transcrição permite uma análise posterior; sozinha, não realiza extração automatizada de pontos-chave. O Amazon Transcribe Call Analytics oferece insights pós-chamada separados, como problemas, resultados e ações, além de resumo generativo opcional. É preciso esclarecer se a análise manual da transcrição basta ou se a intenção é avaliar o Call Analytics. Mantenha a tradução como `machine-draft` e não altere a resposta original sem corrigir a fonte. Consulte a documentação de [análise pós-chamada do Amazon Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/call-analytics-batch.html) e de [resumo de chamadas](https://docs.aws.amazon.com/transcribe/latest/dg/tca-enable-summarization.html).

O item `aif-q029` deve ser entendido como uma questão sobre orientação do comportamento do modelo, não como uma recomendação de segurança suficiente. Instruções no prompt do sistema podem ajudar a delimitar o comportamento, mas não garantem resistência à injeção de prompt nem confidencialidade do próprio prompt. A explicação em português explicita esse limite e recomenda salvaguardas adicionais, em linha com a documentação da AWS sobre [segurança contra injeção de prompt](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/prompt-injection.html) e [detecção de ataques com o Amazon Bedrock Guardrails](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/guardrails-prompt-attack.html). A resposta original permanece intacta; a tradução continua como `machine-draft` até revisão humana.

O item `aif-q039` usa o Amazon SageMaker Clarify como exemplo de explicabilidade. A documentação atual informa que o Clarify não está aberto a novos clientes; confirme a pertinência desse item com o guia de exame vigente antes de apresentá-lo como recomendação atual de serviço. A tradução preserva a resposta da fonte, mas a explicação especifica que o Amazon Macie descobre dados confidenciais e monitora riscos de dados no S3 — ele não criptografa os dados de treinamento conforme a alternativa sugere. Consulte a documentação de [explicabilidade do modelo com Clarify](https://docs.aws.amazon.com/pt_br/sagemaker/latest/dg/clarify-model-explainability.html) e [o que é Amazon Macie](https://docs.aws.amazon.com/pt_br/macie/latest/user/what-is-macie.html).

O item `aif-q064` apresenta uma ambiguidade de requisito: a resposta herdada favorece ajuste fino com adaptação de domínio, mas a alternativa RAG também pode atender à dificuldade com terminologia presente nos artigos. A AWS recomenda RAG quando o objetivo é fornecer fatos, terminologia ou conhecimento de domínio que o modelo ainda não conhece. A tradução preserva a identidade da resposta, explicita a ambiguidade e mantém o item como `machine-draft` até revisão da fonte. Consulte a orientação da AWS sobre [quando usar RAG em vez de ajuste fino](https://docs.aws.amazon.com/pt_br/nova/latest/userguide/fine-tune-prepare-data-understanding.html) e [como as bases de conhecimento fornecem contexto por recuperação](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/kb-how-it-works.html).

## Como contribuir

1. Escolha uma questão e compare-a com o registro correspondente em `src/data/questions.json`.
2. Confira este guia e, para terminologia AWS, a documentação oficial em português brasileiro.
3. Verifique se a tradução preserva a diferença avaliada, os nomes de serviços, as quantidades, o sentido de cada distrator e a chave de resposta.
4. Registre a revisão humana apenas depois de verificar enunciado, todas as opções e explicação.
5. Execute `npm run check` e descreva quais questões foram revisadas.

As traduções são material comunitário de estudo, não traduções oficiais da AWS. Veja também o [guia completo em inglês](pt-BR-translation-guide.md) e as instruções de [contribuição](../CONTRIBUTING.md).

Para o formato dos conjuntos de dados de ajuste fino, consulte a documentação da AWS sobre [preparação de dados para fine-tuning de modelos no Amazon Bedrock](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/model-customization-prepare.html), que descreve `completion` como a saída esperada.

Para explicar tokens, consulte a [terminologia básica do Amazon Bedrock](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/key-definitions.html), que distingue palavras inteiras, partes de palavras e pontuação como possíveis unidades de token.

Para o vocabulário de explicabilidade, compare o guia da AWS sobre [interpretabilidade de modelos de ML](https://docs.aws.amazon.com/pt_br/prescriptive-guidance/latest/ml-model-interpretability/welcome.html) com a documentação do [SageMaker Clarify sobre explicabilidade](https://docs.aws.amazon.com/pt_br/sagemaker/latest/dg/clarify-model-explainability.html). A própria orientação da AWS ressalta que não há uma definição padrão única para explicação de modelos.
