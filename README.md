# Playwright Test Suite

A comprehensive Playwright automation testing framework with Page Object Model pattern.

## Quick Start

### Clone the Repository

```bash
git clone https://github.com/shree081297/Playwright.git
cd Playwright
```

### Installation

1. Install Node.js (if not already installed)
   - Download from https://nodejs.org/
   - Version 14 or higher recommended

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries:
   ```bash
   npx playwright install
   ```

   This will download Chromium, Firefox, and WebKit browsers required for testing.

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

## Running Tests

### Run All Tests
```bash
npm test
```
This runs all test specifications across Chromium, Firefox, and WebKit browsers.

### Run Tests in Headed Mode (Visible Browser)
```bash
npm run test:headed
```
This runs all tests with browser windows visible so you can see the interactions.

### Run Example Test Case (Demo)
The example test case demonstrates basic Playwright functionality using Example.com:

```bash
npx playwright test tests/specs/example.spec.js
```

**What the Example Test Does:**
- Navigates to https://example.com
- Verifies the page title
- Checks if heading is visible
- Validates heading text content

### Run Example Test in Headed Mode
```bash
npx playwright test tests/specs/example.spec.js --headed
```

### Run Tests for Specific Browser

**Chrome/Chromium:**
```bash
npx playwright test --project=chromium
```

**Firefox:**
```bash
npx playwright test --project=firefox
```

**Safari/WebKit:**
```bash
npx playwright test --project=webkit
```

### Run Specific Test File
```bash
npx playwright test tests/specs/example.spec.js
```

### Run Tests with Verbose Output
```bash
npx playwright test --verbose
```

### View Test Report
After running tests, view the HTML report:
```bash
npm run show-report
```

## Available Test Cases

1. **example.spec.js** - Basic example test (Recommended for beginners)
   - Tests page navigation
   - Verifies page title
   - Checks element visibility

2. **guru99-demo.spec.js** - Guru99 demo site tests
   - Page load verification
   - Element visibility checks
   - Page performance testing

3. **google-search.spec.js** - Google search test
   - Browser verification
   - Search functionality

## Demo Example Test Case Walkthrough

### Step-by-Step to Run Demo

1. **Open Terminal/Command Prompt**

2. **Navigate to project directory:**
   ```bash
   cd Playwright
   ```

3. **Run the example test in headed mode:**
   ```bash
   npx playwright test tests/specs/example.spec.js --project=chromium --headed
   ```

4. **Watch the browser:**
   - Chrome will open automatically
   - Playwright will navigate to example.com
   - Tests will verify page elements
   - Chrome will close after tests complete

5. **View results:**
   - Terminal shows ✓ (passed) or ✘ (failed) for each test
   - View HTML report: `npm run show-report`

### Example Output
```
Running 1 test using 1 worker

  ✓  1 [chromium] › tests/specs/example.spec.js › Example Page Tests › should display the page title (3.0s)
  ✓  2 [chromium] › tests/specs/example.spec.js › Example Page Tests › should have visible heading (1.2s)
  ✓  3 [chromium] › tests/specs/example.spec.js › Example Page Tests › should display correct heading text (1.2s)

  3 passed (5.8s)
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

## Troubleshooting

### Issue: Browser fails to install
**Solution:**
```bash
npx playwright install
```

### Issue: Tests timeout
**Solution:** Increase timeout in `playwright.config.js`:
```javascript
timeout: 60 * 1000, // 60 seconds
```

### Issue: Port already in use
**Solution:** Kill the process using the port or use a different port in config.

### Issue: "No such file or directory"
**Solution:** Make sure you're in the Playwright project directory:
```bash
cd Playwright
```

## Tips

- Use `--headed` flag to see browser interactions
- Use `--debug` for step-by-step debugging
- Use `--trace on` to record test traces for debugging
- Run tests in parallel for faster execution
- Use `--project=chromium` to run only specific browser

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-page/)
- [Best Practices](https://playwright.dev/docs/best-practices/)

## Support

For issues or questions:
1. Check Playwright documentation: https://playwright.dev/
2. Review test files in `tests/specs/`
3. Check page objects in `tests/pages/`
