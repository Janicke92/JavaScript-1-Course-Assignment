function renderCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const cartContainer = document.querySelector(".shopping-cart_container");
    cartContainer.innerHTML = "";

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item"); /*STYLING?*/
        
        const productImage = document.createElement("img");
        productImage.src = item.image.url;
        productImage.alt = item.image.alt || item.title;
        productImage.classList.add("cart-product-image"); /*STYLING?*/
        cartContainer.appendChild(productImage);

        const productTitle = document.createElement("h2");
        productTitle.textContent = item.title;
        cartItem.appendChild(productTitle);

        const productPrice = document.createElement("p");
        productPrice.id = "shopping-cart__price";
        productPrice.textContent = `Price: $${item.price.toFixed(2)}`;
        cartItem.appendChild(productPrice);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Item";
        removeButton.classList.add("remove-button"); /*STYLING?*/
        cartItem.appendChild(removeButton);

        removeButton.addEventListener("click", () => {
            removeItemFromCart(item.id);
        });

        cartContainer.appendChild(cartItem);
    });
}

function removeItemFromCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    renderPriceSection();
}

renderCart();


function renderPriceSection() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || []; 

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const totalPriceElement = document.querySelector(".column-left.p_bold");
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
        console.error("Total price element not found.");
    }

    const checkoutContainer = document.querySelector(".js-checkout-button");
    checkoutContainer.innerHTML = ''; 

    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Checkout";
    checkoutButton.classList.add("cta", "cta_checkout");  /*STYLING?*/

    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add an item before checking out.");
        } else {
            sessionStorage.removeItem("cart");
            window.location.href = "confirmation/index.html";
        }
    });
    

    // Append the new button to the container
    checkoutContainer.appendChild(checkoutButton);
}

renderPriceSection();


