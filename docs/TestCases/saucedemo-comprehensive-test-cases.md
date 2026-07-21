# Comprehensive Test Cases — SauceDemo Checkout Flow

This document contains a wide set of manual test cases for SauceDemo, covering functional (positive/negative), edge cases, accessibility, security, performance, compatibility, and exploratory scenarios.

Related: https://github.com/shree081297/Playwright/issues/1

Environment:
- URL: https://www.saucedemo.com/v1/index.html
- Test accounts: `standard_user` / `secret_sauce`, `locked_out_user` / `secret_sauce`

1. Functional Tests (Positive)

TC-FP-01: Valid Login
- Steps:
  1. Navigate to login page.
 2. Enter `standard_user` / `secret_sauce`.
 3. Click `Login`.
- Expected: Land on `/inventory.html`; items visible.

TC-FP-02: Add Single Item to Cart
- Preconditions: Logged in as `standard_user`.
- Steps:
  1. On inventory, click `Add to cart` for `Sauce Labs Backpack`.
 2. Open cart.
- Expected: Cart shows the Backpack; item count increments.

TC-FP-03: Complete Checkout Flow
- Preconditions: Item in cart.
- Steps:
  1. Click `Checkout` from cart.
 2. Enter `John`, `Doe`, `12345` and `Continue`.
  3. Click `Finish`.
- Expected: Confirmation page with `THANK YOU FOR YOUR ORDER`.

TC-FP-04: Remove Item from Cart
- Steps:
  1. Add item to cart.
 2. In cart click `Remove`.
- Expected: Item removed; cart count decrements.

2. Functional Tests (Negative)

TC-FN-01: Invalid Login
- Steps:
  1. Enter `invalid_user` / `wrong_password` and `Login`.
- Expected: Error message; not logged in.

TC-FN-02: Locked Out User
- Steps:
  1. Enter `locked_out_user` / `secret_sauce` and `Login`.
- Expected: Locked out message; no access.

TC-FN-03: Checkout Without Items
- Steps:
  1. Ensure cart is empty and click cart → Checkout.
- Expected: Checkout disallowed or empty overview shown; appropriate message.

TC-FN-04: Submit Empty Checkout Form
- Preconditions: At Checkout Info page.
- Steps:
  1. Leave first/last/postal empty and click `Continue`.
- Expected: Validation error(s) shown; cannot proceed.

3. Edge Cases

TC-EC-01: Very Long Inputs
- Steps:
  1. Enter 1024+ chars in First/Last/Postal fields and submit.
- Expected: Either truncated, validated, or handled gracefully without server errors.

TC-EC-02: Special Characters in Inputs
- Steps:
  1. Enter script tags or special chars in checkout fields.
- Expected: Inputs escaped/validated; no XSS or injection.

TC-EC-03: Simultaneous Adds
- Steps:
  1. Rapidly click `Add to cart` multiple times.
- Expected: Cart count stable and reflects single add if button toggles to `Remove`.

TC-EC-04: Refresh While Processing
- Steps:
  1. During navigation or checkout, refresh the page.
- Expected: Graceful recovery; no inconsistent server state.

4. Accessibility Tests

TC-A11Y-01: Keyboard Navigation
- Steps:
  1. Tab through login, inventory, cart, checkout flows.
- Expected: All interactive controls reachable and operable by keyboard.

TC-A11Y-02: Screen Reader Labels
- Steps:
  1. Inspect ARIA labels and alt texts for product images.
- Expected: Proper accessible names for elements.

TC-A11Y-03: Color Contrast
- Steps:
  1. Verify color contrast for buttons and text using WCAG tools.
- Expected: Passes AA contrast thresholds.

5. Security Tests (Basic)

TC-S-01: Input Validation / XSS
- Steps:
  1. Submit scripts in form fields.
- Expected: No execution of injected scripts; inputs sanitized.

TC-S-02: Auth Protection
- Steps:
  1. Access `/inventory.html` without login (direct URL).
- Expected: Redirect to login; protected resources require auth.

TC-S-03: Session Expiry
- Steps:
  1. Log in, then delete session cookie and interact with app.
- Expected: App prompts to re-login when session invalid.

6. Performance / Load

TC-P-01: Page Load Time
- Steps:
  1. Measure time to load inventory page under normal conditions.
- Expected: Loads within acceptable threshold (e.g., < 3s).

TC-P-02: Checkout Under Load (smoke)
- Steps:
  1. Simulate 10 concurrent users performing checkout (tools required).
- Expected: Server handles load without errors; reasonable response times.

7. Compatibility / Cross-Browser

TC-C-01: Browser Compatibility
- Steps:
  1. Run core flows in Chrome, Firefox, Edge, Safari.
- Expected: Functional parity across supported browsers.

8. Internationalization / Localization

TC-L-01: Non-ASCII Inputs
- Steps:
  1. Enter unicode characters (e.g., Chinese, Cyrillic) in names.
- Expected: System accepts/display them without corruption.

9. Regression Scenarios

TC-R-01: Cart Persistence
- Steps:
  1. Add item to cart, close tab, reopen and log in.
- Expected: Cart persists per session/account policy.

TC-R-02: Price Consistency
- Steps:
  1. Verify item price on inventory, cart, overview are consistent.
- Expected: No price mismatch.

10. Exploratory Ideas
- Try bookmarking pages, deep-linking product pages, manipulating network (slow 3G), and verify sensible behavior.

Execution Notes
- For each failed test capture: browser, OS, URL, steps, expected vs actual, screenshot, console logs.
- When automating, add these to CI as separate tests and attach HTML report and videos for failures.
