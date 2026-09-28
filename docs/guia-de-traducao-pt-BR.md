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

O item `aif-q029` deve ser entendido como uma questão sobre orientação do comportamento do modelo, não como uma recomendação de segurança suficiente. Instruções no prompt do sistema podem ajudar a delimitar o comportamento, mas não garantem resistência à injeção de prompt nem confidencialidade do próprio prompt. A explicação em português explicita esse limite e recomenda salvaguardas adicionais, em linha com a documentação da AWS sobre [segurança contra injeção de prompt](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/prompt-injection.html) e [detecção de ataques com o Amazon Bedrock Guardrails](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/guardrails-prompt-attack.html). A resposta original permanece intacta; a tradução continua como `machine-draft` até revisão humana.

## Como contribuir

1. Escolha uma questão e compare-a com o registro correspondente em `src/data/questions.json`.
2. Confira este guia e, para terminologia AWS, a documentação oficial em português brasileiro.
3. Verifique se a tradução preserva a diferença avaliada, os nomes de serviços, as quantidades, o sentido de cada distrator e a chave de resposta.
4. Registre a revisão humana apenas depois de verificar enunciado, todas as opções e explicação.
5. Execute `npm run check` e descreva quais questões foram revisadas.

As traduções são material comunitário de estudo, não traduções oficiais da AWS. Veja também o [guia completo em inglês](pt-BR-translation-guide.md) e as instruções de [contribuição](../CONTRIBUTING.md).

Para o formato dos conjuntos de dados de ajuste fino, consulte a documentação da AWS sobre [preparação de dados para fine-tuning de modelos no Amazon Bedrock](https://docs.aws.amazon.com/pt_br/bedrock/latest/userguide/model-customization-prepare.html), que descreve `completion` como a saída esperada.
