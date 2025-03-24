async function loadApps() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    try {
        const response = await fetch("/apps.json");
        const appIds = await response.json();

        for (const id of appIds) {
            try {
                const response = await fetch(`/apps/${id}/info.json`);
                const appData = await response.json();

                const appElement = document.createElement("div");
                appElement.className = "app";
                appElement.style.display = "none";
                appElement.innerHTML = `
                    <img src="/apps/${id}/icon.png" alt="${appData.name}" class="app-icon">
                    <div class="app-info">
                        <h3>${appData.name}</h3>
                        <p>${appData.description}</p>
                    </div>
                `;

                appElement.onclick = () => {
                    window.location.href = `/apps/${id}/`;
                };

                resultsContainer.appendChild(appElement);
            } catch (error) {
                console.error(`Fehler beim Laden der App ${id}:`, error);
            }
        }
    } catch (error) {
        console.error("Fehler beim Laden der App-Liste:", error);
    }
}

function filterApps() {
    const query = document.getElementById("searchField").value.toLowerCase();
    const apps = document.querySelectorAll(".app");

    const filteredApps = [];

    apps.forEach(app => {
        const title = app.querySelector("h3").textContent.toLowerCase();
        if (title.includes(query)) {
            filteredApps.push(app);
        } else {
            app.style.display = "none";
        }
    });

    if (query.trim() === "") {
        apps.forEach(app => {
            app.style.display = "none";
        });
        return;
    }

    filteredApps.forEach(app => {
        app.style.display = "block";
    });
}

let debounceTimer;

document.getElementById("searchField").addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        filterApps();
    }, 300);
});

document.getElementById("searchField").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        filterApps();
    }
});

window.onload = loadApps;
