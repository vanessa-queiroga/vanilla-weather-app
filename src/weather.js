function formatDate(time) {
  let now = new Date(time);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dates = now.getDate();
  let days = now.getDay();
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${weekDay[days]}, ${dates}th , ${hours}:${minutes}`;
}

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return weekDays[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#week-forecast");

  let weekForecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      weekForecastHTML =
        weekForecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-day">${formatForecast(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
              />
              <div class="weather-forecast-temp">
                <span class="weather-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                <span class="weather-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
              </div>
            </div>`;
    }
  });

  weekForecastHTML = weekForecastHTML + `</div>`;
  forecastElement.innerHTML = weekForecastHTML;
}

function sendForecast(coordinates) {
  let lon = coordinates.lon;
  let lat = coordinates.lat;

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatTemperature(temperature) {
  celciusTemp = Math.round(temperature.data.main.temp);
  let weather = celciusTemp;
  let country = temperature.data.sys.country;
  let cityData = temperature.data.name;
  let description = temperature.data.weather[0].description;
  let maxTemperature = Math.round(temperature.data.main.temp_max);
  let humidityData = temperature.data.main.humidity;
  let wind = Math.round(temperature.data.wind.speed);
  let date = temperature.data.dt * 1000;
  let icon = temperature.data.weather[0].icon;

  let cityName = document.querySelector("#city-name");
  let countryName = document.querySelector("#country");
  let weatherNumber = document.querySelector("#temp-number");
  let maxTemp = document.querySelector("#max-temp");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  weatherNumber.innerHTML = `${weather}°`;
  maxTemp.innerHTML = ` ${maxTemperature}° C`;
  humidity.innerHTML = `${humidityData}`;
  windSpeed.innerHTML = wind;
  cityName.innerHTML = cityData;
  countryName.innerHTML = `, ${country}`;
  weatherDescription.innerHTML = description;
  dateElement.innerHTML = formatDate(date);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", description);

  sendForecast(temperature.data.coord);
}

function searchWeather(event) {
  event.preventDefault();
  celciusNumber.classList.add("active");
  fTempLink.classList.remove("active");
  let cityElement = document.querySelector("#city-value");
  let cityElementValue = cityElement.value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElementValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(formatTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchWeather);

function searchCityPage() {
  let mainCity = "london";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${mainCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(formatTemperature);
}

function displayFTemp() {
  celciusNumber.classList.remove("active");
  fTempLink.classList.add("active");

  let fTemperature = Math.round((celciusTemp * 9) / 5 + 32);
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = `${fTemperature}°`;
}

let fTempLink = document.querySelector("#f-temp");
fTempLink.addEventListener("click", displayFTemp);

function displayCTemp() {
  celciusNumber.classList.add("active");
  fTempLink.classList.remove("active");
  let mainTemp = document.querySelector("#temp-number");
  mainTemp.innerHTML = `${celciusTemp}°`;
}

let celciusNumber = document.querySelector("#c-temp");
celciusNumber.addEventListener("click", displayCTemp);

let celciusTemp = null;
searchCityPage();
