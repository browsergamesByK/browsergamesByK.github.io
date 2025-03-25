async function displayGameIcons() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous content

    try {
        const response = await fetch("/apps.json");
        const appIds = await response.json();

        const iconContainer = document.createElement("div");
        iconContainer.style.display = "flex";
        iconContainer.style.flexWrap = "wrap";
        iconContainer.style.gap = "20px";
        iconContainer.style.justifyContent = "center";

        for (const id of appIds) {
            try {
                const appResponse = await fetch(`/apps/${id}/info.json`);
                const appData = await appResponse.json();

                const iconElement = document.createElement("div");
                iconElement.style.width = "100px";
                iconElement.style.textAlign = "center";

                iconElement.innerHTML = `
                    <img src="/apps/${id}/icon.png" alt="${appData.name}" style="width: 100px; height: 100px; border-radius: 10px; cursor: pointer;">
                    <p style="color: white; font-size: 14px; margin-top: 5px;">${appData.name}</p>
                `;

                iconElement.onclick = () => {
                    window.location.href = `/apps/${id}/`;
                };

                iconContainer.appendChild(iconElement);
            } catch (error) {
                console.error(`Fehler beim Laden der App ${id}:`, error);
            }
        }

        resultsContainer.appendChild(iconContainer);
    } catch (error) {
        console.error("Fehler beim Laden der App-Liste:", error);
    }
}

// Call the function on page load
window.onload = () => {
    loadApps(); // Existing function for search functionality
    displayGameIcons(); // New function to display icons
};