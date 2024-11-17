
/*const API_URL = "https://v2.api.noroff.dev/gamehub"*/

import { fetchAllProductsFromAPI } from "./fetchAllProductsFromAPI.mjs";
import { renderAllProductsFromArray } from "./renderFunctions.mjs";
import { filterProductsByGenre } from "./filterFunctions.mjs"; 
import { showLoader, hideLoader } from "./loaderFunctions.mjs";

function generateDropdownOptions(genres, dropdownElement) {
    dropdownElement.innerHTML = "";

    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
        dropdownElement.appendChild(option);
    });
}

async function displayHomePage() {
    showLoader();
    try {
        const productList = document.querySelector(".product-list");
        const genreFilter = document.getElementById("genre-filter");

        const allProducts = await fetchAllProductsFromAPI();

        const uniqueGenres = ["all", ...new Set(allProducts.map(product => product.genre.toLowerCase()))];
        generateDropdownOptions(uniqueGenres, genreFilter);

        renderAllProductsFromArray(allProducts, productList);

        genreFilter.addEventListener("change", (event) => {
            const selectedGenre = event.target.value;
            const filteredProducts = filterProductsByGenre(allProducts, selectedGenre);
            renderAllProductsFromArray(filteredProducts, productList);
        });
    } catch (error) {
        alert("We encountered an error while loading the home page. Please refresh the page or try again later.");
        console.error("Error displaying home page:", error);
    }finally {
        hideLoader();
    }
}

displayHomePage();
