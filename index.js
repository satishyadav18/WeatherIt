const apiKey = CONFIG.WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".weatherType").innerHTML = data.weather[0].main;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    const condition = data.weather[0].main;
    if (condition === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition === "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (condition === "Snow") {
        weatherIcon.src = "images/snow.png";
    } else {
        weatherIcon.src = "";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
}

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

