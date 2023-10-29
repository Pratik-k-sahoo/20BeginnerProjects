const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const cloudImg = document.getElementsByClassName("cloud-img")[0];
let imgUrl = "";
const tempData = document.getElementsByClassName("temp-data")[0];
const cityName = document.getElementsByClassName("city-name")[0];
const humidValue = document.getElementsByClassName("humid-value")[0];
const windValue = document.getElementsByClassName("wind-value")[0];
const error = document.getElementById("error")
const weatherProfile = document.getElementById("weather-profile")

//Weather api
const apiKey = "270e3d604a360c82835207876ee150a9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather() {
  const city = search.value;
  search.value = null;
  console.log(search.value);
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);

  if (response.status == 404) {
    error.style.display = "block";
    weatherProfile.style.display = "none";

    setInterval(() => {
      error.style.display = "none";
    }, 3000);
  }
  else {

    const data = await response.json();

    console.log(data);
    let temp = data.main.temp;
    let name = data.name;
    let humid = data.main.humidity;
    let wind = data.wind.speed;
    let weather = data.weather[0].main;
    tempData.innerHTML = `<h1>${temp}&deg;c</h1><p>feels like ${data.main.feels_like}&deg;c</p>`;

    cityName.innerHTML = `<h2>${name}</h2>`;

    humidValue.innerHTML = `<h3>${humid}%</h3>
  <h4>Humidity</h4>`;

    windValue.innerHTML = `<h3>${wind} km/h</h3>
  <h4>Wind Speed</h4>`;

    if (weather == 'Clouds') {
      imgUrl = "data/clouds.png"
    }
    else if (weather == 'Drizzle') {
      imgUrl = "data/drizzle.png"
    }
    else if (weather == 'Mist') {
      imgUrl = "data/mist.png"
    }
    else if (weather == 'Rain') {
      imgUrl = "data/rain.png"
    }
    else if (weather == 'Snow') {
      imgUrl = "data/snow.png"
    }
    else {
      imgUrl = "data/clear.png"
    }

    cloudImg.src = imgUrl;

    weatherProfile.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  // console.log("btn Clicked");
  checkWeather();
});