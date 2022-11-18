function formatTemperature(temperature) {
  let weather = Math.round(temperature.data.main.temp);
  let country = temperature.data.sys.country;
  let cityData = temperature.data.name;
  let description = temperature.data.weather[0].description;
  let maxTemperature = Math.round(temperature.data.main.temp_max);
  let humidityData = temperature.data.main.humidity;
  let wind = Math.round(temperature.data.wind.speed);

  let cityName = document.querySelector("#city-name");
  let countryName = document.querySelector("#country");
  let weatherNumber = document.querySelector("#temp-number");
  let maxTemp = document.querySelector("#max-temp");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#description");

  weatherNumber.innerHTML = `${weather}°`;
  maxTemp.innerHTML = ` ${maxTemperature}° C`;
  humidity.innerHTML = `${humidityData}`;
  windSpeed.innerHTML = wind;
  cityName.innerHTML = cityData;
  countryName.innerHTML = `, ${country}`;
  weatherDescription.innerHTML = description;
}

let city = "Tokyo";
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(formatTemperature);
