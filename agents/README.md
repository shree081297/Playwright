# Agents

These small Node agent scripts wrap common Playwright tasks for convenience.

- `node agents/run-tests.js [args]` — run full test suite with optional Playwright args.
- `node agents/run-single.js <spec-path> [args]` — run a single spec file.
- `node agents/open-report.js` — open the Playwright HTML report.
- `node agents/record-video.js [args]` — run tests configured to record video (requires `use.video` in config).

Examples:

```bash
node agents/run-tests.js --project=chromium
node agents/run-single.js test/e2e/spec/saucedemo.spec.js --headed
node agents/open-report.js
```
