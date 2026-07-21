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

11. Login Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result |
|---|---|---|---|---|
| TC_LOGIN_001 | Verify login with valid credentials | Enter valid username and password, click Login | Valid username & password | User is logged in and redirected to the home page. |
| TC_LOGIN_002 | Verify login with invalid password | Enter valid username and invalid password, click Login | Valid username, invalid password | Error message is displayed and login fails. |
| TC_LOGIN_003 | Verify login with invalid username | Enter invalid username and valid password | Invalid username, valid password | Error message is displayed. |
| TC_LOGIN_004 | Verify login with both invalid credentials | Enter invalid username and password | Invalid username & password | Login should fail with an appropriate error message. |
| TC_LOGIN_005 | Verify login with empty username | Leave username blank and enter password | Blank username | Validation message should be displayed. |
| TC_LOGIN_006 | Verify login with empty password | Enter username and leave password blank | Blank password | Validation message should be displayed. |
| TC_LOGIN_007 | Verify login with both fields empty | Leave both fields blank and click Login | Blank username & password | Required field validation should appear. |
| TC_LOGIN_008 | Verify password masking | Type a password | Password | Password should be hidden using dots/asterisks. |
| TC_LOGIN_009 | Verify "Remember Me" functionality | Select Remember Me, log in, reopen browser | Valid credentials | Username/session should be remembered as per requirement. |
| TC_LOGIN_010 | Verify "Forgot Password" link | Click Forgot Password | N/A | User should be redirected to the password reset page. |
| TC_LOGIN_011 | Verify login using Enter key | Enter credentials and press Enter | Valid credentials | User should be logged in successfully. |
| TC_LOGIN_012 | Verify maximum username length | Enter username exceeding the allowed length | Long username | Appropriate validation should be displayed. |
| TC_LOGIN_013 | Verify maximum password length | Enter password exceeding the allowed length | Long password | Validation should be handled correctly. |
| TC_LOGIN_014 | Verify SQL Injection prevention | Enter SQL injection strings | `' OR '1'='1` | Login should fail and the application should remain secure. |
| TC_LOGIN_015 | Verify XSS prevention | Enter script tags in username/password | `<script>alert(1)</script>` | Script should not execute; input should be sanitized. |
| TC_LOGIN_016 | Verify Trim functionality | Enter credentials with leading/trailing spaces | `" user "` | Spaces should be handled according to the application's requirements. |
| TC_LOGIN_017 | Verify Logout and re-login | Log in, log out, then log in again | Valid credentials | User should be able to log in again successfully. |
| TC_LOGIN_018 | Verify session timeout | Log in and remain idle until the session expires | Valid credentials | User should be logged out and prompted to log in again. |
| TC_LOGIN_019 | Verify account lock after multiple failed attempts | Enter incorrect password multiple times | Invalid password | Account should be locked or CAPTCHA shown as per security policy. |
| TC_LOGIN_020 | Verify Login button state | Observe Login button with empty fields | N/A | Button should be enabled/disabled according to the application's design. |
| TC_LOGIN_021 | Verify password visibility toggle | Enter a password and use the show/hide password control | Password | Password is toggled between hidden and visible states according to UI controls. |

Execution Notes
- For each failed test capture: browser, OS, URL, steps, expected vs actual, screenshot, console logs.
- When automating, add these to CI as separate tests and attach HTML report and videos for failures.
