# Playwright Test Suite

A comprehensive Playwright automation testing framework with Page Object Model pattern.

## Project Structure

```
playwright/
├── tests/
│   ├── fixtures/          # Custom test fixtures
│   ├── pages/             # Page Object Models
│   ├── specs/             # Test specifications
│   └── utils/             # Helper utilities
├── playwright.config.js   # Playwright configuration
├── package.json           # Dependencies
└── README.md              # This file
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install browser binaries:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests for specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run specific test file
```bash
npx playwright test tests/specs/example.spec.js
```

### View test report
```bash
npm run show-report
```

## Page Object Model

Tests use the Page Object Model pattern to abstract page interactions. Page classes are located in `tests/pages/` and extend `BasePage` for common functionality.

### Example Usage
```javascript
const ExamplePage = require('../pages/example.page');

test('example test', async ({ page }) => {
  const examplePage = new ExamplePage(page);
  await examplePage.goto();
  await examplePage.click('button');
});
```

## Configuration

Update `playwright.config.js` to modify:
- Test directory
- Timeout settings
- Browser options
- Reporters

## Environment Variables

Create a `.env` file from `.env.example` to configure environment-specific settings.
