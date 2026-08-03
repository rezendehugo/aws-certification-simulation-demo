# AIF-C01 Simulation Demo

A static, bilingual, keyboard-accessible AWS Certified AI Practitioner practice simulation. It runs entirely in the browser and stores progress only on the current device.

## Features

- 65 questions / 90 minutes / 50 scored + 15 hidden unscored
- English and Portuguese interface and reports
- system, light, and dark themes
- responsive exam workspace and complete keyboard controls
- Markdown AI study brief and answer-key-free JSON report

This is a static product demonstration. Answer data exists in the downloadable browser bundle, so it is not a secure exam platform. It is not affiliated with or endorsed by Amazon Web Services.

Question data is adapted from [CloudCertPrep](https://github.com/nastaso/cloudcertprep), commit `3ec8a763268d244c99664fed4f23f2b759099408`, under the MIT License. Copyright © 2026 Alex Santonastaso.

## Local development

Requires Node.js 24 or newer.

```bash
npm install
npm run dev
```

Run `npm run check` before publishing. GitHub Pages deploys from `main` through the included workflow.
