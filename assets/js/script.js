
// gitignore the APIkey
var APIkey = "e25845a4dbea1389264f9b820c89ea63" 
var fivedayforecast = ""
var locationEl = document.querySelector("#location");
var tempVal = document.querySelector("#temp");
var humidVal = document.querySelector("#humid");
var windspVal = document.querySelector("#windsp");
var uviVal = document.querySelector("#uvi");
var cityVal = document.querySelector("#city")
// 7day forecast variables ----------------------------------------------------------------------------------------
// day1
var tempVal1 = document.querySelector("#temp1");
var humidVal1 = document.querySelector("#humid1");
var windspVal1 = document.querySelector("#windsp1");
var uviVal1 = document.querySelector("#uvi1");
// day2
var tempVal2 = document.querySelector("#temp2");
var humidVal2 = document.querySelector("#humid2");
var windspVal2 = document.querySelector("#windsp2");
var uviVal2 = document.querySelector("#uvi2");
// day3
var tempVal3 = document.querySelector("#temp3");
var humidVal3 = document.querySelector("#humid3");
var windspVal3 = document.querySelector("#windsp3");
var uviVal3 = document.querySelector("#uvi3");

// Weather DATA Queries
async function getWeatherData() {
    var fivedayforecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationEl.value}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    console.log(fivedayforecast)

    var oneCall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayforecast.city.coord.lat}&lon=${fivedayforecast.city.coord.lon}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    console.log(oneCall)

    // current weather data ------------------------------------------------------------
    cityVal.textContent= fivedayforecast.city.name
    tempVal.textContent= oneCall.current.temp + "*C"
    humidVal.textContent= oneCall.current.humidity + "%"
    windspVal.textContent= oneCall.current.wind_speed + " kms/hr"
    uviVal.textContent= oneCall.current.uvi

    // 7 day forecast -------------------------------------------------------------------
    // day1
    tempVal1.textContent= oneCall.daily.0.temp + "*C"
    humidVal1.textContent= oneCall.current.humidity + "%"
    windspVal1.textContent= oneCall.current.wind_speed + " kms/hr"
    uviVal1.textContent= oneCall.current.uvi 
    // day2
    tempVal2.textContent= oneCall.current.temp + "*C"
    humidVal2.textContent= oneCall.current.temp + "%"
    windspVal2.textContent= oneCall.current.temp + " kms/hr"
    uviVal2.textContent= oneCall.current.temp 
    // day3
    tempVal3.textContent= oneCall.current.temp + "*C"
    humidVal3.textContent= oneCall.current.temp + "%"
    windspVal3.textContent= oneCall.current.temp + " kms/hr"
    uviVal3.textContent= oneCall.current.temp 


}


locationEl.addEventListener("keydown", function(event){
    if (event.keyCode === 13){
        getWeatherData();
    }
})




// fetch loads the data from the information










// function displayWeather() {
//     if (weather) {
//         ellipse(50, 100, weather.main.temp, weather.main.temp);
//         ellipse(50, 100, weather.main.wind, weather.main.wind_speed);
//         ellipse(50, 100, weather.main.humidity, weather.main.humidity);
//         ellipse(50, 100, weather.main.temp, weather.main.temp);
//     } 
// }











// Time Display/Refresh ------------------------------------------------------------------
var time = moment();
$("#time-display").text(time.format('dddd, MMM Do YYYY, h:mm:ss a'));


function currentTime(){
    var time = moment();
    $("#time-display").text(time.format('dddd, MMM Do YYYY, h:mm:ss a'));
    var currentHour = moment().hour();

};
 setInterval(currentTime,1000);