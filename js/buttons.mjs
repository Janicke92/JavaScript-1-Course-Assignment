import { calculateTotalAmount } from './calculateTotal.mjs';

export function AddToCartButton(product) {
    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.classList.add("cta", "cta_checkout");

    button.addEventListener("click", () => {
        addProductToCart(product);
    });

    return button;
}

function addProductToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const productExists = cart.some(item => item.id === product.id);
    if (productExists) {
        alert("This product is already in your cart!");
        return;
    }

    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}

export function RemoveFromCartButton(productId, onRemoveCallback) {
    const button = document.createElement("button");
    button.textContent = "Remove Item";
    button.classList.add("cta", "cta_checkout", "remove-item-button");

    button.addEventListener("click", () => {
        removeProductFromCart(productId);

        if (onRemoveCallback) {
            onRemoveCallback();
        }

        updateTotalAmount();
    });

    return button;
}

function removeProductFromCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

function updateTotalAmount() {
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const totalContainer = document.querySelector(".column-left.p_bold");

    if (!totalContainer) {
        console.error("Total container not found!");
        return;
    }

    const totalPrice = calculateTotalAmount(cartItems);
    totalContainer.textContent = `Total: $${totalPrice}`;
}

export function CheckoutButton(onCheckout) {
    const button = document.createElement("button");
    button.textContent = "Checkout";
    button.classList.add("cta", "cta_checkout");

    button.addEventListener("click", () => {
        const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        sessionStorage.removeItem("cart");

        onCheckout();
    });

    return button;
}
