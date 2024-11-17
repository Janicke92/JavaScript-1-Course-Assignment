import { fetchProductById } from "./fetchProductByID.mjs";
import { renderProductDetails } from "./renderFunctions.mjs";
import { AddToCartButton } from "./buttons.mjs";
import { showLoader, hideLoader } from "./loaderFunctions.mjs";

async function displayProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        alert("Error: No product ID found. Please return to the home page.");
        window.location.href = "../index.html";
        return;
    }

    showLoader();

    try {
        const product = await fetchProductById(productId);
        const productContainer = document.querySelector(".product-card");

        renderProductDetails(product.data, productContainer);

        const addToCartButton = AddToCartButton(product.data);
        productContainer.appendChild(addToCartButton);
    } catch (error) {
        alert("We encountered an error while loading the product. Please try again later.");
        console.error("Error displaying product page:", error);
    } finally {
        hideLoader();
    }
}

displayProductPage();
