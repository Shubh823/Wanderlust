// map.js

// Function to fetch coordinates using OpenStreetMap Nominatim API

async function getCoordinates(location) {
    console.log("Fetching coordinates for location:", location);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
    const data = await response.json();
    
    // If location data is found, extract lat and lon
    if (data.length > 0) {
        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
        };
    } else {
        throw new Error("Location not found");
    }
}

// Initialize the map (default view set to India)
const map = L.map('map').setView([20.5937, 78.9629], 5); // Default to India

// Default Tile Layer (Light Mode)
let currentTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch coordinates and update map based on location
function initializeMap(location) {
    getCoordinates(location).then(({ lat, lon }) => {
        // Update the map view to the location coordinates
        map.setView([lat, lon], 13);

        // Add a marker to the map
        const marker = L.marker([lat, lon]).addTo(map);

        // Optionally, bind a popup to the marker
        marker.bindPopup(`<b>${title}</b><br>${location}`).openPopup(); 
    }).catch(error => {
        console.log("Error fetching location:", error);
        
    });
}

// Expose initializeMap function globally to use in show.ejs
window.initializeMap = initializeMap;
