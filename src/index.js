function replaceIcon(condition) {
  let iconElement = document.querySelector("#current-temperature-icon");
  let icon;
  var currentTime = new Date();
  var currentHour = currentTime.getHours();

  if (condition === "clear sky") {
    if (currentHour >= 6 && currentHour < 18) {
      icon = "src/pictures/Weather-sun.png";
    } else {
      icon = "src/pictures/Weather-moon.png";
    }
  } else if (condition === "few clouds") {
    icon = "src/pictures/Weather-few-clouds.png";
  } else if (condition === "scattered clouds") {
    icon = "src/pictures/Weather-scattered-clouds.png";
  } else if (condition === "broken clouds" || condition === "overcast clouds") {
    icon = "src/pictures/Weather-broken-clouds.png";
  } else if (condition === "shower rain") {
    icon = "src/pictures/Weather-shower-rain.png";
  } else if (condition === "rain") {
    icon = "src/pictures/Weather-rain.png";
  } else if (condition === "thunderstorm") {
    icon = "src/pictures/Weather-thunderstorm.png";
  } else {
    icon = "src/pictures/Weather-mist.png";
  }
  iconElement.innerHTML = `<img src="${icon}"class="weather-app-icon" />`;
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
  replaceIcon(response.data.condition.description);
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
