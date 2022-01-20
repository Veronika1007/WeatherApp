// Date & Time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dateTime = document.querySelector("#date");
dateTime.innerHTML = `${day}, ${hour}:${minutes}`;

// C & F Units
function celcisusUnitChange(event) {
  event.preventDefault();
  let temperatureCelcius = document.querySelector("#temperature");
  temperatureCelcius.innerHTML = "2°C";
}
let changeCelcius = document.querySelector("#celcicusLink");
changeCelcius.addEventListener("click", celcisusUnitChange);

function fahrenheitUnitChange(event) {
  event.preventDefault();
  let temperatureFahrenheit = document.querySelector("#temperature");
  temperatureFahrenheit.innerHTML = "36 °F";
}

let changeFahrenheit = document.querySelector("#fahrenheitLink");
changeFahrenheit.addEventListener("click", fahrenheitUnitChange);

function showCityTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `Current Temperature is ${Math.round(
    response.data.main.temp
  )} ℃`;

  let minTemp = document.querySelector("#minTemp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)} ℃ <br /> LOW`;

  let maxTemp = document.querySelector("#maxTemp");
  maxTemp.innerHTML = `${Math.round(
    response.data.main.temp_max
  )} ℃ <br /> HIGH`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} ℃`;
}
// Current Location

function retrievePosition(position) {
  let apiKey = "f9113edd4d5c19caba9923a536e8e53e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemp);
}

function currentLocationSearch(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationLocator = document.querySelector("#currentLocation");
currentLocationLocator.addEventListener("click", currentLocationSearch);

// Search Location

function searchCity(event) {
  event.preventDefault();
  let apiKey = "f9113edd4d5c19caba9923a536e8e53e";
  let cityInput = document.querySelector("#newCity");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", searchCity);
