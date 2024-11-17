export function calculateTotalAmount(cartItems) {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
}