import { renderCartItems } from './renderFunctions.mjs';
import { calculateTotalAmount } from './calculateTotal.mjs';
import { CheckoutButton } from './buttons.mjs';

function displayCartItems() {
    const cartContainer = document.querySelector(".shopping-cart_container");

    if (!cartContainer) {
        console.error("Cart container not found!");
        return;
    }

    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        displayInitialTotal(cartItems);
        return;
    }

    renderCartItems(cartItems, cartContainer);
    displayInitialTotal(cartItems);
}

function displayInitialTotal(cartItems) {
    const totalContainer = document.querySelector(".column-left.p_bold");

    if (!totalContainer) {
        console.error("Total container not found!");
        return;
    }

    const totalPrice = calculateTotalAmount(cartItems);
    totalContainer.textContent = `$${totalPrice}`;
}

function displayCheckoutButton() {
    const checkoutContainer = document.querySelector(".js-checkout-button");
    if (!checkoutContainer) {
        console.error("Checkout button container not found!");
        return;
    }

    const checkoutButton = CheckoutButton(() => {
        window.location.href = "./confirmation/index.html";
    });

    checkoutContainer.appendChild(checkoutButton);
}

displayCartItems();
displayCheckoutButton();