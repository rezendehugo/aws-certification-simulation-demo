# Simulado AWS AI Practitioner

[![Abrir demonstração](https://img.shields.io/badge/abrir_o_simulado-AIF--C01-cbe875?style=for-the-badge)](https://rezendehugo.github.io/aws-certification-simulation-demo/)
[![Deploy GitHub Pages](https://github.com/rezendehugo/aws-certification-simulation-demo/actions/workflows/pages.yml/badge.svg)](https://github.com/rezendehugo/aws-certification-simulation-demo/actions/workflows/pages.yml)
[![Licença MIT](https://img.shields.io/badge/licença-MIT-blue.svg)](LICENSE)

Um simulado open source para AWS Certified AI Practitioner com 65 questões, conteúdo em inglês e português brasileiro, atalhos de teclado, progresso offline e relatório detalhado de estudos.

## [Iniciar o simulado →](https://rezendehugo.github.io/aws-certification-simulation-demo/)

Sem cadastro, rastreamento ou servidor. O progresso permanece no seu navegador.

> [Read in English](README.md)

## Recursos

- 65 questões em 90 minutos
- 50 questões pontuadas e 15 não pontuadas ocultas
- Distribuição pelos cinco domínios do AIF-C01
- Múltipla escolha, múltiplas respostas, ordenação e associação
- Interface, questões, explicações e relatórios em PT-BR
- Temas claro, escuro e conforme o sistema
- Operação completa por mouse, toque e teclado
- Exportação de resumo Markdown para estudo com IA
- Persistência somente no dispositivo

## Sobre as traduções

As 65 traduções atuais são rascunhos comunitários automáticos e ainda precisam de revisão humana. Essa informação aparece na aplicação. Os identificadores das respostas não são traduzidos, portanto mudar o idioma não altera a correção ou a pontuação. Preservamos nomes de serviços e termos de prova em inglês quando uma tradução literal pode confundir conceitos; consulte o [guia de tradução e glossário em português](docs/guia-de-traducao-pt-BR.md) ou o [guia em inglês](docs/pt-BR-translation-guide.md).

Você conhece AWS e português técnico? Revise uma questão usando o [guia oficial AIF-C01 em português](https://docs.aws.amazon.com/pt_br/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) e envie uma [correção de tradução](https://github.com/rezendehugo/aws-certification-simulation-demo/issues/new?template=translation.yml).

## Desenvolvimento local

Requer Node.js 24 ou superior.

```bash
npm install
npm run dev
npm run check
```

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para traduções e alterações de código.

## Avisos e origem

As questões foram adaptadas do [CloudCertPrep](https://github.com/nastaso/cloudcertprep), commit `3ec8a763268d244c99664fed4f23f2b759099408`, sob a licença MIT. Copyright © 2026 Alex Santonastaso.

Este projeto não é afiliado nem endossado pela Amazon Web Services. Não contém questões reais ou vazadas de certificação. A AWS apresenta os resultados como pontuação em escala; aqui, o percentual é apenas a proporção de acertos entre as questões pontuadas deste simulado e não prevê aprovação.
