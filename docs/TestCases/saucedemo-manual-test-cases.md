# Manual Test Cases — SauceDemo Checkout Flow

Related: https://github.com/shree081297/Playwright/issues/1

Preconditions:
- Test environment accessible and stable (internet access).
- Browser installed (Chrome/Chromium recommended).
- Test data available: `standard_user` / `secret_sauce`, `locked_out_user` / `secret_sauce`.
- Application URL: https://www.saucedemo.com/v1/index.html

Test Data:
- Valid user: `standard_user` / `secret_sauce`
- Locked user: `locked_out_user` / `secret_sauce`
- Invalid user: `invalid_user` / `wrong_password`

Test Case: TC-01 — Valid Login
- Objective: Verify a valid user can log in and reach the inventory page.
- Steps:
  1. Open browser and navigate to the application URL.
  2. Enter username `standard_user` in the Username field.
  3. Enter password `secret_sauce` in the Password field.
  4. Click the `Login` button.
- Expected Result:
  - User is navigated to the inventory page (URL contains `/inventory.html`).
  - Inventory items are visible.
- Pass Criteria: Inventory page loads and at least one product is displayed.

Test Case: TC-02 — Invalid Login
- Objective: Verify the application shows an error for invalid credentials.
- Steps:
  1. Navigate to the login page.
  2. Enter username `invalid_user` and password `wrong_password`.
 3. Click `Login`.
- Expected Result:
  - An error message is displayed indicating username and password do not match any user in the system.
- Pass Criteria: Error message appears and login is not performed.

Test Case: TC-03 — Locked Out User
- Objective: Verify locked out users cannot login and receive the locked message.
- Steps:
  1. Navigate to the login page.
  2. Enter username `locked_out_user` and password `secret_sauce`.
  3. Click `Login`.
- Expected Result:
  - An error message is displayed indicating the user has been locked out.
- Pass Criteria: Error message contains the word "locked" and access is denied.

Test Case: TC-04 — Add Sauce Labs Backpack to Cart (from Inventory)
- Objective: Verify a user can add the Backpack to the cart from inventory.
- Preconditions: User is logged in as `standard_user` and on the inventory page.
- Steps:
  1. On the inventory page find the product titled `Sauce Labs Backpack`.
 2. Click the product's `Add to cart` button.
 3. Verify the cart badge increments (or cart shows 1 item).
- Expected Result:
  - The Backpack is added to cart; cart icon shows updated item count.
- Pass Criteria: Cart shows 1 item and the button text changes to `Remove` (if applicable).

Test Case: TC-05 — Checkout Flow (Fill Info and Continue)
- Objective: Verify checkout flow accepts user details and proceeds to overview.
- Preconditions: Backpack is in the cart and user is on the cart page.
- Steps:
  1. Click the cart icon to open the mini cart.
  2. Click `Checkout`.
  3. On the checkout information page enter: First name = `John`, Last name = `Doe`, Postal Code = `12345`.
  4. Click `Continue`.
- Expected Result:
  - The checkout overview page loads showing the item(s) and a `Finish` button.
- Pass Criteria: Overview page displays the Backpack and the `Finish` button is visible.

Test Case: TC-06 — Finish Order and Verify Confirmation
- Objective: Complete checkout and verify the final confirmation message.
- Preconditions: On the checkout overview page with valid information entered.
- Steps:
  1. Click `Finish` on the checkout overview page.
  2. Observe the confirmation/thank-you page.
- Expected Result:
  - A confirmation page is displayed with the message: "THANK YOU FOR YOUR ORDER" (punctuation may vary).
- Pass Criteria: The confirmation header/text contains the phrase `THANK YOU FOR YOUR ORDER`.

Optional Exploratory Tests (not required for acceptance):
- Verify item price and total on the overview page.
- Verify `Remove` functionality from cart updates item count.
- Verify navigation/back behavior at each step.

Test Execution Notes:
- Record browser, OS, and Playwright (if used) version when logging defects.
- Capture screenshots on failures and attach HTML report if automated run is available.
