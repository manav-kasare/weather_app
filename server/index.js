const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())


// Weather API endpoint
app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = await getWeatherData(cities);
    res.json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

async function getWeatherData(cities) {
  const apiKey = '8a730ef15fff4aee837175429231107';
  const weatherData = {};

  for (const city of cities) {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const { temp_c } = response.data.current;
      weatherData[city] = `${temp_c}°C`;
    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error.message);
      weatherData[city] = 'N/A';
    }
  }

  return weatherData;
}

const port = 3000; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});