const express = require('express');
const axios = require('axios');
const fs = require('fs').promises; // Using promises version of fs
const cors = require('cors');
const app = express();
const port = 3000;

let weatherData = {}; // Initialize empty weather data object

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    return res.send('To see the weather move to /api/weather');
});

app.get('/api/', (req, res) => {
    return res.send('This is an API to get the weather details.');
});

app.get('/api/weather', async (req, res) => {
    try {
        await fetchAndSaveWeatherData();
        return res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return res.status(500).send('Error fetching weather data');
    }
});

app.get('/api/weather/:location', async (req, res) => {
    const location = req.params.location.toLowerCase();
    try {
        // Check if weather data exists for the requested location
        if (weatherData[location]) {
            return res.json(weatherData[location]);
        } else {
            throw new Error('Weather data not found for the requested location.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return res.status(500).send('Error fetching weather data');
    }
});

const fetchAndSaveWeatherData = async () => {
    const cities = ["Karachi", "Lahore", "Islamabad"];

    // Fetch weather data for each city
    for (const city of cities) {
        try {
            const data = await getWeather(city);
            weatherData[city.toLowerCase()] = data; // Save weather data to memory
        } catch (error) {
            console.error(`Error fetching weather data for ${city}:`, error.message);
            throw error;
        }
    }

    // Save weather data to file after fetching all cities
    await saveWeatherToFile();
};

const getWeather = async (city) => {
    const cityCoordinates = {
        "Karachi": { lat: 24.8607, lon: 67.0011 },
        "Lahore": { lat: 31.5497, lon: 74.3436 },
        "Islamabad": { lat: 33.6844, lon: 73.0479 }
    };

    const coordinates = cityCoordinates[city];
    if (!coordinates) {
        throw new Error('City not supported. Try Karachi, Lahore, or Islamabad.');
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current_weather=true`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data.current_weather;

        // Mock high and low temperatures as Open-Meteo API does not provide them directly
        const highTemp = weatherData.temperature + 2; // Example adjustment
        const lowTemp = weatherData.temperature - 2; // Example adjustment

        const formattedWeather = {
            date: new Date().toISOString().split('T')[0],
            location: city,
            temperature: {
                high: highTemp,
                low: lowTemp
            },
            conditions: "Partly Cloudy", // Example condition, adjust as needed
            humidity: weatherData.relative_humidity || 68, // Mocked as Open-Meteo API does not provide humidity in current_weather
            windSpeed: weatherData.windspeed
        };

        return formattedWeather;
    } catch (error) {
        console.error('Error fetching the weather data:', error.message);
        throw error;
    }
};

const saveWeatherToFile = async () => {
    try {
        await fs.writeFile('./weather.json', JSON.stringify(weatherData, null, 2));
        console.log('Weather data saved to file.');
    } catch (error) {
        console.error('Error saving weather data to file:', error.message);
        throw error;
    }
};

// Set up the interval to fetch and save weather data every 5 hours
const interval = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

setInterval(async () => {
    try {
        await fetchAndSaveWeatherData();
        console.log("The database is updated!");
    } catch (error) {
        console.error('Error during scheduled weather data update:', error.message);
    }
}, interval);

// Perform initial fetch and save when the server starts
fetchAndSaveWeatherData().catch(error => {
    console.error('Error fetching initial weather data:', error.message);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
