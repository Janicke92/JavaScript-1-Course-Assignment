import { RemoveFromCartButton } from './buttons.mjs';

export function renderSingleProduct(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("products");

    const productLink = document.createElement("a");
    productLink.href = `/products/?id=${product.id}`;
    productLink.textContent = product.title;

    const productTitle = document.createElement("h2");
    productTitle.appendChild(productLink);

    const productImage = document.createElement("img");
    productImage.src = product.image.url;
    productImage.alt = product.image.alt || product.title;

    const productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price}`;

    productDiv.appendChild(productTitle);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productPrice);

    return productDiv;
}

export function renderAllProductsFromArray(products, container, /*context = "default"*/) {
    container.innerHTML = ""; 

    products.forEach(product => {
        const productElement = renderSingleProduct(product, /*context*/);
        container.appendChild(productElement);
    });
}

export function renderProductDetails(product, container) {
    container.innerHTML = ""; 

    const productTitle = document.createElement("h1");
    productTitle.textContent = product.title;
    
    const productImage = document.createElement("img");
    productImage.src = product.image.url;
    productImage.alt = product.image.alt || product.title;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.price}`;

    container.appendChild(productTitle);
    container.appendChild(productImage);
    container.appendChild(productDescription);
    container.appendChild(productPrice);
}

export function renderCartItems(products, container) {
    container.innerHTML = "";

    products.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const productImage = document.createElement("img");
        productImage.src = product.image.url;
        productImage.alt = product.image.alt || product.title;

        const productTitle = document.createElement("h2");
        productTitle.textContent = product.title;

        const productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price}`;

        const removeButton = RemoveFromCartButton(product.id, () => {
            renderCartItems(JSON.parse(sessionStorage.getItem("cart")) || [], container);
        });

        cartItem.appendChild(productImage);
        cartItem.appendChild(productTitle);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(removeButton);

        container.appendChild(cartItem);
    });
}
