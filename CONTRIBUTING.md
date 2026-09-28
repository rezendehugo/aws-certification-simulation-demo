# Contributing

Thank you for helping learners prepare more effectively. Small, focused pull requests are easiest to review.

## Translation corrections

Portuguese content lives in `src/data/questions.pt-BR.json`. Each record is matched to its English source by a stable question ID.

Read the [PT-BR translation guide and terminology glossary](docs/pt-BR-translation-guide.md) before changing learner-facing Portuguese. This is exam-preparation content, so a fluent sentence is not enough: the translation must preserve the tested distinction and help learners recognize the English term used in AWS materials.

1. Choose one question.
2. Compare it with the English record in `src/data/questions.json`.
3. Use the project glossary, then check official AWS Brazilian Portuguese documentation for current terminology. Keep service and product names in English.
4. Preserve acronyms and the English exam term where translating it could blur a distinction; explain it in natural Brazilian Portuguese at first use.
5. Check that no distractor becomes obviously correct or incorrect because of wording, and that the translation does not add or remove a technical claim.
6. Change `status` to `human-reviewed`, add the real reviewer's name, and add an ISO `reviewedAt` date only after a person has reviewed the complete stem, every option, and explanation against the source. Tool-assisted edits remain `machine-draft` until that review happens.
7. Run `npm run check`.

Never change option IDs or `correctAnswer` while translating. Do not copy real or leaked certification questions.

## Code changes

- Use strict TypeScript and avoid `any`.
- Keep scoring and localization logic in pure functions.
- Add tests for behavioral changes.
- Preserve keyboard and screen-reader access.
- Do not add analytics, accounts, API calls, secrets, or book-derived content.

## Pull requests

Explain the user-visible outcome, identify the questions affected, and include the checks you ran. By contributing, you agree that your contribution is distributed under this repository's MIT License.
