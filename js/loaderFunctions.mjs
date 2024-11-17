export function showLoader() {
    const loader = document.createElement("div");
    loader.id = "loader";

    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    loader.appendChild(spinner);

    document.body.appendChild(loader);
}

export function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.remove();
    }
}
