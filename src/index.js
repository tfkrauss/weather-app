import { WeatherData, CurrentConditions, HoursWeather, getData } from "./weather-data";


/**
 *  
 * 
 */
let weatherResponse;
let weatherData;

/**
 *  Get text fields for the weather grid data
 */
const feelsLike = document.querySelector(".data-value.temp");
const humidity = document.querySelector(".data-value.humidity");
const mph = document.querySelector(".data-value.mph");
const dew = document.querySelector(".data-value.dew");
const uv = document.querySelector(".data-value.uv");
const visibility = document.querySelector(".data-value.visibility");

/**
 *  Get text fields for weather summary data
 */
const location = document.querySelector(".weather-title");
const temp = document.querySelector(".temperature")
const conditions = document.querySelector(".conditions");
const high = document.querySelector(".high");
const low = document.querySelector(".low");

function setData(weatherData) {

    //Update weather summary data
    location.textContent = weatherData.getAddress();
    temp.textContent = weatherData.getCurrTemp();
    conditions.textContent = weatherData.getCurrConditions();
    high.textContent = weatherData.getDaysHigh(0);
    low.textContent = weatherData.getDaysLow(0);

    //Update weather grid data
    feelsLike.textContent = weatherData.getCurrFeelsLike();
    humidity.textContent = weatherData.getCurrHumidity();
    mph.textContent = weatherData.getCurrWindSpeed();
    dew.textContent = weatherData.getCurrDew();
    uv.textContent = weatherData.getCurrUV();
    visibility.textContent = weatherData.getCurrVisibility();

}

/**
 *  Get value of search input
 */
const search = document.querySelector(".search-in");
const searchBtn = document.querySelector(".search-btn");

//Function to display error message if an invalid location is entered
function nullSearchError() {
    searchError.style.display = "flex";
    search.value = "";
}

searchBtn.addEventListener("click", async (e) =>  {
    e.preventDefault();
    weatherResponse = await getData(search.value);
    console.log(weatherResponse)
    if(weatherResponse === null) {
        nullSearchError();
        return;
    } 

    weatherData = new WeatherData(weatherResponse);
    setData(weatherData);
})

search.addEventListener("input", () => {
    if (searchError.style.display === "flex") {
        searchError.style.display = "none";
    }
})

const searchError = document.querySelector(".search-error");


