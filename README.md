# AWS AI Practitioner Simulation

[![Live demo](https://img.shields.io/badge/try_the_live_demo-AIF--C01-cbe875?style=for-the-badge)](https://rezendehugo.github.io/aws-certification-simulation-demo/)
[![Deploy GitHub Pages](https://github.com/rezendehugo/aws-certification-simulation-demo/actions/workflows/pages.yml/badge.svg)](https://github.com/rezendehugo/aws-certification-simulation-demo/actions/workflows/pages.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![English / Português](https://img.shields.io/badge/languages-EN_%7C_PT--BR-167a55.svg)](README.pt-BR.md)

An open-source AWS Certified AI Practitioner rehearsal with a realistic 65-question format, English and Brazilian Portuguese content, complete keyboard controls, offline progress, and detailed study reports.

## [Start the live simulation →](https://rezendehugo.github.io/aws-certification-simulation-demo/)

No signup. No analytics. No server. Progress stays in your browser.

> [Leia em português](README.pt-BR.md)

## Why this project?

Most practice tools hide useful feedback behind an account or subscription. This demo provides a transparent, inspectable simulation that can be studied, translated, improved, and self-hosted by the community.

| Exam experience | Study experience | Accessibility and privacy |
| --- | --- | --- |
| 65 questions in 90 minutes | Domain-level results | EN and PT-BR content |
| 50 scored + 15 hidden unscored | Answer review and explanations | Mouse, touch, and keyboard |
| Official domain weighting | Markdown AI study brief | Light, dark, and system themes |
| Multiple choice, response, ordering, matching | Answer-key-free JSON report | Device-local persistence |

## Keyboard controls

| Key | Action |
| --- | --- |
| `A–E` or `1–5` | Select or toggle an answer |
| `←` / `→` | Previous or next question |
| `F` | Flag or unflag |
| `Shift + Enter` | Open submission confirmation |
| `Escape` | Close a dialog or drawer |
| `?` | Open shortcut help |

## Portuguese questions

All 65 questions include a Brazilian Portuguese community draft. The interface labels drafts transparently because technical translations can change the meaning of a stem or distractor. Answer IDs and scoring remain language-independent and are protected by automated tests.

Want to help? Review one question against the [official Portuguese AIF-C01 guide](https://docs.aws.amazon.com/pt_br/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html), then open a [translation correction](https://github.com/rezendehugo/aws-certification-simulation-demo/issues/new?template=translation.yml). See [CONTRIBUTING.md](CONTRIBUTING.md) for the checklist.

## Local development

Requires Node.js 24 or newer.

```bash
npm install
npm run dev
```

Before proposing a change:

```bash
npm run check
```

The check runs strict TypeScript validation, content/scoring tests, linting, and a production build. GitHub Pages deploys automatically from `main`.

## Roadmap

- Human review of all 65 PT-BR question drafts
- Per-distractor explanations
- Missed-question and low-confidence review sessions
- Installable offline PWA
- CLF-C02 simulation

See the repository issues for work that is ready for contributors. Issues labeled `good first issue` are intentionally small and documented.

## Content provenance and disclaimer

Question data is adapted from [CloudCertPrep](https://github.com/nastaso/cloudcertprep), commit `3ec8a763268d244c99664fed4f23f2b759099408`, under the MIT License. Copyright © 2026 Alex Santonastaso. Community translations are derivative study material and are not official AWS translations.

This project is not affiliated with or endorsed by Amazon Web Services. AWS service names and trademarks belong to their respective owners. The questions are original practice material, not real or leaked exam questions. AWS uses scaled scoring; the percentage shown here is only a raw practice score.

Because this is a static demonstration, answer data exists in the downloadable browser bundle. It is not suitable for secure or commercial examinations.

## Community

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md), follow the [Code of Conduct](CODE_OF_CONDUCT.md), and report vulnerabilities according to [SECURITY.md](SECURITY.md).

If this project helps your preparation, share the live demo, report a translation improvement, or star the repository so other learners can find it.
