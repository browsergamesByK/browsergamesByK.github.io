async function displayGameIcons() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = `
        <p style="color: white; text-align: center; font-size: 24px; font-weight: bold; margin-top: 20px;">
            Loading...
        </p>
    `; // Display "Loading..." with larger text

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

        resultsContainer.innerHTML = ""; // Clear "Loading..." text
        resultsContainer.appendChild(iconContainer);
    } catch (error) {
        console.error("Fehler beim Laden der App-Liste:", error);
        resultsContainer.innerHTML = "<p style='color: red; text-align: center;'>Fehler beim Laden der Spieleliste.</p>";
    }
}

// Call the function on page load
window.onload = () => {
    loadApps(); // Existing function for search functionality
    displayGameIcons(); // New function to display icons
};

// Call the function on page load
window.onload = () => {
    loadApps(); // Existing function for search functionality
    displayGameIcons(); // New function to display icons
};