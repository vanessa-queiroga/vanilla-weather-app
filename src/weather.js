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

function formatTemperature(temperature) {
  console.log(temperature);
  let weather = Math.round(temperature.data.main.temp);
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
}

let city = "sydney";
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(formatTemperature);
