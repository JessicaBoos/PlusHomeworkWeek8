function replaceIcon(condition) {
  let icon;
  var currentTime = new Date();
  var currentHour = currentTime.getHours();

  switch (condition) {
    case "clear sky":
    case "sky is clear":
      icon =
        currentHour >= 6 && currentHour < 18
          ? "src/pictures/Weather-sun.png"
          : "src/pictures/Weather-moon.png";
      break;
    case "few clouds":
      icon = "src/pictures/Weather-few-clouds.png";
      break;
    case "scattered clouds":
      icon = "src/pictures/Weather-scattered-clouds.png";
      break;
    case "broken clouds":
    case "overcast clouds":
      icon = "src/pictures/Weather-broken-clouds.png";
      break;
    case "shower rain":
    case "moderate rain":
      icon = "src/pictures/Weather-shower-rain.png";
      break;
    case "rain":
    case "light rain":
      icon = "src/pictures/Weather-rain.png";
      break;
    case "snow":
    case "light snow":
    case "rain and snow":
      icon = "src/pictures/Weather-snow.png";
      break;
    case "thunderstorm":
      icon = "src/pictures/Weather-thunderstorm.png";
      break;
    default:
      icon = "src/pictures/Weather-mist.png";
  }
  return icon;
}

function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let conditionElement = document.querySelector("#weather-condition");
  conditionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#weather-humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#weather-wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  let iconElement = document.querySelector("#current-temperature-icon");
  iconElement.innerHTML = `<img src="${replaceIcon(
    response.data.condition.description
  )}" class="weather-app-icon" />`;
  getForecast(response.data.city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
         <span class="weather-forecast-icon"><img src="${replaceIcon(
           day.condition.description
         )}" width="70px" /> </span>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function searchCity(city) {
  let apiKey = "bb5982aa3c1a3d9fb3839bo024tffc09";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "bb5982aa3c1a3d9fb3839bo024tffc09";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Dortmund");
