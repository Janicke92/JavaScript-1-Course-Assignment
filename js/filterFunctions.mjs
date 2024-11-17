export function filterProductsByGenre(products, genre) {
    if (genre === "all") return products;
    return products.filter(product => product.genre.toLowerCase() === genre.toLowerCase());
}
