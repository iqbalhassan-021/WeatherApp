Weather API Documentation
Introduction
This API allows you to retrieve and store weather data for various cities. It uses Express.js for the server framework, Axios for making HTTP requests to the weather API, and FS with promises for file operations. The API fetches weather data for predefined cities and serves it through various endpoints.

Installation
To get started with this project, you need to have Node.js installed. Then, follow these steps:

Clone the repository:



git clone <repository-url>
Navigate to the project directory:



cd <project-directory>
Install the dependencies:


npm install
Dependencies
The project uses the following npm packages:

express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
axios: A promise-based HTTP client for the browser and Node.js, used for making HTTP requests to fetch weather data.
fs: The file system module, used here with promises to handle file operations asynchronously.
cors: A middleware for enabling CORS (Cross-Origin Resource Sharing) with various options.
Install these packages using the following command:


npm install express axios fs cors

API Endpoints

1. Root Endpoint
URL: /
Method: GET
Description: Provides a welcome message and instructions to navigate to the weather endpoint.
Response: Plain text message.
json
Copy code
"To see the weather move to /api/weather"
2. API Info Endpoint
URL: /api/
Method: GET
Description: Provides basic information about the API.
Response: Plain text message.
json
Copy code
"This is an API to get the weather details."
3. Weather Data Endpoint
URL: /api/weather
Method: GET
Description: Fetches and returns weather data for predefined cities (Karachi, Lahore, Islamabad).
Response: JSON object containing weather data for the cities.

{
    "karachi": { ...weather data... },
    "lahore": { ...weather data... },
    "islamabad": { ...weather data... }
}
4. Weather Data by Location Endpoint
URL: /api/weather/:location
Method: GET
Description: Fetches and returns weather data for a specific city.
Parameters:
location (string): The name of the city (e.g., karachi, lahore, islamabad).
Response: JSON object containing weather data for the specified city.

{
    "date": "2024-07-23",
    "location": "Lahore",
    "temperature": { "high": 34, "low": 28 },
    "conditions": "Partly Cloudy",
    "humidity": 68,
    "windSpeed": 15
}
Usage
To run the server, use the following command:


node index.js
The server will start on http://localhost:3000.

Frontend Integration
The project also includes a simple frontend to display weather data. The HTML file uses vanilla JavaScript to fetch and display weather data from the API. To view the frontend, open index.html in a web browser.

The frontend provides a dropdown to select a city and displays the current weather, humidity, and wind speed. It also predicts and displays the temperature for the next four days using Chart.js.

Running the Project
Start the server:


node index.js
Open index.html in your browser to interact with the frontend.

Notes
The API fetches weather data every 5 hours and saves it to a file (weather.json).
The weather data is mocked for high and low temperatures and conditions for demonstration purposes.
For any issues or contributions, please refer to the GitHub repository.
