# PBI: End-to-end Checkout Flow for SauceDemo

## Summary
Implement an automated end-to-end test and supporting artifacts for the SauceDemo checkout flow so the team can validate happy and common unhappy paths via CI and local agents.

## User Story
As a QA engineer, I want an automated E2E test that covers login (valid, invalid, locked), add-to-cart, checkout, and order confirmation, so we can detect regressions in the main purchase flow.

## Acceptance Criteria
- The test opens https://www.saucedemo.com/v1/index.html and verifies:
  1. Successful login with `standard_user` / `secret_sauce` lands on inventory page.
 2. Invalid credentials show an appropriate error message.
 3. `locked_out_user` shows the locked-out message.
 4. From the inventory page, add `Sauce Labs Backpack` to cart.
 5. Open mini cart and click `Checkout`.
 6. Enter First Name, Last Name, Postal Code and continue.
 7. Finish order and verify the "THANK YOU FOR YOUR ORDER" confirmation is displayed.
- The test is implemented using Page Object Model with locators separated in `test/e2e/locators/`.
- Agents exist to run the test locally and in CI (`agents/run-tests.js`, `agents/run-single.js`, etc.).
- The Playwright config points to `test/e2e/spec` and the test runs in Chromium in CI.

## Tasks
- [ ] Create/verify Page Object: `test/e2e/pages/saucedemo.page.js` (uses `test/e2e/locators/saucedemo.locators.js`).
- [ ] Create spec: `test/e2e/spec/saucedemo.spec.js` covering the acceptance criteria.
- [x] Add locator files under `test/e2e/locators/` and update page objects to import them.
- [x] Add agents scripts under `agents/` to run tests and open reports.
- [ ] Add optional CI job to run the spec and upload artifacts (videos, report).
- [ ] Add documentation and how-to-run steps in `docs/PBIs/` and `docs/`.

## Definition of Done
- All acceptance criteria pass locally and in CI.
- Code is reviewed and merged to `main`.
- README updated with run steps and agents documented.
- Test artifacts (HTML report, video) are archived as CI artifacts.

## Estimates & Priority
- Estimate: 3 story points
- Priority: High

## Notes
- Use built-in test account credentials provided by SauceDemo for automation (`standard_user`, `locked_out_user`, `secret_sauce`).
- Use headed mode for debugging (`npm run agent:headed`) and headless for CI.
