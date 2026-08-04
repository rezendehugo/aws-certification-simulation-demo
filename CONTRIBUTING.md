# Contributing

Thank you for helping learners prepare more effectively. Small, focused pull requests are easiest to review.

## Translation corrections

Portuguese content lives in `src/data/questions.pt-BR.json`. Each record is matched to its English source by a stable question ID.

1. Choose one question.
2. Compare it with the English record in `src/data/questions.json`.
3. Use terminology from the official AWS Portuguese documentation.
4. Preserve AWS product names, acronyms, quantities, emphasis, and answer meaning.
5. Check that no distractor becomes obviously correct or incorrect because of wording.
6. Change `status` to `human-reviewed`, add `reviewer`, and add an ISO `reviewedAt` date only if you reviewed the complete stem, every option, and explanation.
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
