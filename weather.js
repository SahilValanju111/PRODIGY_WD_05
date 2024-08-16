// Your actual OpenWeatherMap API key
const apiKey = '478092283f5065fbac46b41d5fe4ffd8';

// Function to fetch weather data based on the user's input
function fetchWeatherBasedOnInput(location) {
    // Build the API URL with the user-inputted location and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch the weather data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data); // Display the fetched weather data
        })
        .catch(error => {
            alert("Unable to fetch weather data. Please try again.");
            console.error("Error fetching weather data:", error);
            document.getElementById('weather-container').innerHTML = "<p>Error fetching weather data. Please check the location name.</p>";
        });
}

// Function to display the weather data on the webpage
function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    if (data && data.name) {
        const location = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        // Update the HTML with the weather data
        weatherContainer.innerHTML = `
            <h2>Weather in ${location}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${description}</p>
        `;
    } else {
        weatherContainer.innerHTML = "<p>Could not retrieve weather data.</p>";
    }
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherBasedOnInput(location);
    } else {
        alert("Please enter a location.");
    }
});
