# Manual Test Case — Drybar Add-to-Cart and Checkout (Guest)

Preconditions:
- Browser installed (Chrome/Chromium recommended).
- Network access to https://www.drybar.com/website

Test Data:
- Shipping details example: First Name: `Alice`, Last Name: `Smith`, Address: `123 Main St`, City: `Los Angeles`, State: `CA`, Postal Code: `90001`, Email: `alice@example.com`, Phone: `555-0100`.

Steps and Expected Results:

1. Navigate to https://www.drybar.com/website
   - Expected: Drybar homepage loads.

2. Close the popup if displayed
   - Expected: Popup is dismissed and page is usable.

3. Click on `Accept all` (cookie banner)
   - Expected: Cookies banner closes and consent applied.

4. Mouse over `Hair Products` and click `Shampoos`
   - Expected: Browser navigates to the shampoos category: https://www.drybar.com/hair-care-products/shampoos
   - Validate page title / URL matches the shampoos page.

5. Click on a product from the list
   - Expected: Product detail page opens.

6. Click `Add to Cart` on the product page
   - Expected: Product is added; Add button may change to `Remove` or cart badge increments.

7. Click on the mini cart (cart icon)
   - Expected: Mini cart or cart drawer opens showing added items.

8. Validate product appears in mini cart
   - Expected: The selected product's name is present in the mini cart.

9. Validate the price in mini cart
   - Expected: Product price shown and matches the product page price.

10. Click `Proceed to Checkout`
    - Expected: Checkout flow begins, cart/checkout page loads.

11. Choose `Checkout as Guest` (if prompted)
    - Expected: Guest checkout form appears.

12. Close any promotional popup displayed during checkout
    - Expected: Popup dismissed without losing the checkout state.

13. Enter shipping address details
    - Fill the form with the test data above.
    - Expected: Form accepts input; validation messages appear for invalid/missing fields.

14. Continue to payment/confirmation (stop before submitting live payment)
    - Expected: Order summary/confirmation page appears, do NOT submit payment in test.

Pass Criteria:
- All steps complete without unhandled errors.
- Product is visible in mini cart with correct price.
- Checkout form accepts the provided shipping details and proceeds to order summary.

Notes:
- Capture screenshots at failures and record console/network logs.
- For automation: use test accounts and mock payment or stop before payment submission.
