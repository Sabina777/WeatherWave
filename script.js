const apiKey = '7c3b7b1ab7d0e2a6ff3dfe476909fcfc'; // Replace with your API key

async function getWeather() {
  const cityInput = document.getElementById('city-input');
  const errorMessage = document.getElementById('error-message');
  const weatherInfo = document.getElementById('weather-info');

  const cityName = cityInput.value.trim();

  if (cityName === '') {
    errorMessage.textContent = 'Please enter a city name..';
    weatherInfo.textContent = '';
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      errorMessage.textContent = '';
      displayWeather(data);
    } else {
      errorMessage.textContent = `Error: ${data.message || 'Failed to fetch weather data.'}`;
      weatherInfo.textContent = '';
    }
  } catch (error) {
    errorMessage.textContent = 'An error occurred while fetching data.';
    weatherInfo.textContent = '';
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weather-info');
  const { name, main, weather } = data;

  const temperature = main.temp;
  const description = weather[0].description;

  weatherInfo.innerHTML = `
    <p><strong>City:</strong> ${name}</p>
    <p><strong>Temperature:</strong> ${temperature} &#8451;</p>
    <p><strong>Description:</strong> ${description}</p>
  `;
}
