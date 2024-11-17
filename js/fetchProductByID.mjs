import { API_URL_GAMEHUB } from "./constants.mjs";

export async function fetchProductById(productId) {
    try {
        const response = await fetch(`${API_URL_GAMEHUB}/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        return await response.json();
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
}