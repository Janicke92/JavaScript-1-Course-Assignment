import { API_URL_GAMEHUB } from "./constants.mjs";

export async function fetchAllProductsFromAPI() {
    try {
        const response = await fetch(API_URL_GAMEHUB, { method: "GET" });
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}
