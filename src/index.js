import "./style.css";

/*
** Function to retrieve weather data from the API given a location string. 
** Returns a javascript object with weather data if successful.
** Returns null if an error is encountered.
*/
async function getData(location){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=PMDMLRKSNGNPK9ESC8Z3ZTPCH&contentType=json`;
    try {
        const response = await fetch(url, {mode: 'cors'});
        console.log(response);
        if (!response.ok) {
            // create error object and reject if not a 2xx response code
            let err = new Error("HTTP status code: " + response.status);
            throw err
        }
        const weatherData = await response.json();
        return weatherData;
    }
    catch(error) {
        console.log(error)
        return null;
    }
}




/*
** Class respresenting a single object holding weather data for a given request.
** Contains weather for XX days time as well as current conditions.
** Daily weather is stored in a daysWeather[] array
** Constructor filters the weather data response json from the getData call
*/
class WeatherData {

    constructor(weatherResponse) {

        this.daysWeather = [];
        this.initDaysWeather(weatherResponse);
        this.latitude = weatherResponse.latitude;
        this.longitude = weatherResponse.longitude;
        this.address = weatherResponse.resolvedAddress;
        this.timezone = weatherResponse.timezone;
        this.description = weatherResponse.description;

        this.currentConditions = new CurrentConditions(weatherResponse.currentConditions);
    }

    initDaysWeather(weatherResponse){
        const days = weatherResponse.days;
        days.forEach(day => {
            const thatDaysWeather = new DaysWeather(day.hours)
            this.daysWeather.push(thatDaysWeather);
        });
    }
}





/*
** Class respresenting a single object holding weather data for a single day
** 
** 
** 
*/
class DaysWeather {

    constructor(hoursWeatherArray) {

        this.eachHoursWeather = [];
        this.initHoursWeather(hoursWeatherArray);


    }

    initHoursWeather(hoursWeatherArray) {
        hoursWeatherArray.forEach(hour => {
            const hoursWeather = new HoursWeather(hour);
            this.eachHoursWeather.push(hoursWeather);
        });
    }
}

/*
** Class respresenting a single object holding weather data for a single hour.
** 
** 
** 
*/
class HoursWeather {
    //Create a new HoursWeather object containing filtered data given the raw day's weather data array for each hours weather from the API request
    constructor(hoursWeather) {
        this.temp = hoursWeather.temp;
        this.feelsLike = hoursWeather.feelslike;
        this.humidity = hoursWeather.humidity;
        this.dew = hoursWeather.dew;
        this.conditions = hoursWeather.conditions;
        this.precip = hoursWeather.precip;
        this.precipProb = hoursWeather.precipprob;
        this.visibility = hoursWeather.visibility;
        this.cloudCover = hoursWeather.cloudcover;
        this.windSpeed = hoursWeather.windspeed;
        this.windDir = hoursWeather.winddir;
        this.windGust = hoursWeather.windgust;
    }

    getTemp(){
        return this.temp;
    }

    getFeelsLike(){
        return this.feelsLike;
    }

    getHumidity(){
        return this.humidity;
    }

    getConditions(){
        return this.conditions;
    }

    getPrecip(){
        return this.precip;
    }

    getPrecipProb(){
        return this.precipProb;
    }

    getDew(){
        return this.dew;
    }

    getVisibility(){
        return this.visibility;
    }

    getCloudCover(){
        return this.cloudCover;
    }

    getWindSpeed(){
        return this.windSpeed;
    }

    getWindDir(){
        return this.windDir;
    }

    getWindGust(){
        return this.windGust;
    }
}


/*
** Class holding data for the current conditions.
** Used to store data for display for WeatherData objects
*/
class CurrentConditions {
    constructor(conditions) {
        this.conditions = conditions.conditions;
        this.datetime = conditions.datetime;
        this.temp = conditions.temp;
        this.feelsLike = conditions.feelslike;
        this.humidity = conditions.humidity;
        this.dew = conditions.dew;
        this.conditions = conditions.conditions;
        this.precip = conditions.precip;
        this.precipProb = conditions.precipprob;
        this.visibility = conditions.visibility;
        this.cloudCover = conditions.cloudcover;
        this.windSpeed = conditions.windspeed;
        this.windDir = conditions.winddir;
        this.windGust = conditions.windgust;
    }


    getTemp(){
        return this.temp;
    }

    getFeelsLike(){
        return this.feelsLike;
    }

    getHumidity(){
        return this.humidity;
    }

    getConditions(){
        return this.conditions;
    }

    getPrecip(){
        return this.precip;
    }

    getPrecipProb(){
        return this.precipProb;
    }

    getDew(){
        return this.dew;
    }

    getVisibility(){
        return this.visibility;
    }

    getCloudCover(){
        return this.cloudCover;
    }

    getWindSpeed(){
        return this.windSpeed;
    }

    getWindDir(){
        return this.windDir;
    }

    getWindGust(){
        return this.windGust;
    }
}

//Works successfully
const weatherData = await getData('LosANgeles');
console.log("WEATHER DATA:  ")
console.log(weatherData)
const weather = new WeatherData(weatherData);
console.log( weather)