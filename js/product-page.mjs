// Extract the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
    // Load product details based on the id
    console.log(`Product ID: ${productId}`);
    // Add your logic to fetch and display product details
} else {
    console.error('No product ID found in the URL.');
}


/*Function for the add to cart button, pushes the product to the "cart" */
function addToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || []; 

    const productExists = cart.some(item => item.id === product.id);
    if (productExists) {
        alert("This product is already in your cart!");
        return;
    }

    cart.push(product);
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

/*Function that fetches the product details from the API based the product ID*/
async function fetchProductDetails() {
    if (!productId) {
        console.error("No product ID found in URL");
        return;
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/gamehub/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }

        const product = await response.json();

        displayProductDetails(product); 
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

function displayProductDetails(product) {
    const productContainer = document.querySelector(".product-card");

    if (!productContainer) {
        console.error("Product container not found");
        return;
    }

    productContainer.innerHTML = '';

    const productTitle = document.createElement("h1");
    productTitle.textContent = product.data.title;
    productContainer.appendChild(productTitle);

    const productImage = document.createElement("img");
    productImage.src = product.data.image.url;
    productImage.alt = product.data.image.alt || product.data.title;
    productContainer.appendChild(productImage);

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.data.price.toFixed(2)}`;
    productContainer.appendChild(productPrice);

    /*Add to cart button (event listener at the bottom)*/
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.id = "add-to-cart"; 
    productContainer.appendChild(addToCartButton);

    const productDescription = document.createElement("p");
    productDescription.textContent = product.data.description;
    productContainer.appendChild(productDescription);

    const productAgeRating = document.createElement("p");
    productAgeRating.textContent = `Age Rating: ${product.data.ageRating}`;
    productContainer.appendChild(productAgeRating);

    const productGenre = document.createElement("p");
    productGenre.textContent = `Genre: ${product.data.genre}`;
    productContainer.appendChild(productGenre);

    const productRelease = document.createElement("p");
    productRelease.textContent = `Released: ${product.data.released}`;
    productContainer.appendChild(productRelease);

    /*Event listener for ATC button*/
    addToCartButton.addEventListener('click', () => {
        addToCart({
            id: product.data.id,
            title: product.data.title,
            price: product.data.price,
            image: product.data.image,
        });
    });
}

fetchProductDetails();