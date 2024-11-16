
// const NOROFF_API_URL = "https://docs.noroff.dev/docs/v2/e-commerce/gamehub"

/*
 */

const API_URL = "https://v2.api.noroff.dev/gamehub";

let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
        });
        const data = await response.json();
        allProducts = data.data;

        const uniqueGenres = getUniqueGenres(allProducts);
        populateDropdown(uniqueGenres);

        renderProducts(allProducts);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function getUniqueGenres(products) {
    const genres = products.map(product => product.genre.toLowerCase());
    return ["all", ...new Set(genres)];
}

function populateDropdown(genres) {
    const genreFilter = document.getElementById("genre-filter");
    genreFilter.innerHTML = '';

    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
        genreFilter.appendChild(option);
    });

    genreFilter.addEventListener("change", (event) => {
        const selectedGenre = event.target.value;

        if (selectedGenre === "all") {
            renderProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product => 
                product.genre.toLowerCase() === selectedGenre
            );
            renderProducts(filteredProducts);
        }
    });
}

fetchProducts();

function renderProducts(products) {
    const productList = document.querySelector(".product-list");
    productList.innerHTML = ""; 

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("products");

        const productLink = document.createElement("a");
        productLink.href = `/products/?id=${product.id}`;
        productLink.textContent = product.title;

        const productTitle = document.createElement('h2');
        productTitle.appendChild(productLink);
        productDiv.appendChild(productTitle);

        const productImage = document.createElement("img");
        productImage.src = product.image.url;
        productImage.alt = product.image.alt || product.title;
        productDiv.appendChild(productImage);

        const productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price}`;
        productDiv.appendChild(productPrice);

        productList.appendChild(productDiv);
    });
}

fetchProducts();