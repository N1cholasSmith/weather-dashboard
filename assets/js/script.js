
// gitignore the APIkey
var APIkey = "e25845a4dbea1389264f9b820c89ea63" 
var fivedayforecast = ""
var locationEl = document.querySelector("#location");
var tempVal = document.querySelector("#temp");
var humidVal = document.querySelector("#humid");
var windspVal = document.querySelector("#windsp");
var uviVal = document.querySelector("#uvi");

async function getWeatherData() {
    var fivedayforecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationEl.value}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    console.log(fivedayforecast)

    var oneCall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayforecast.city.coord.lat}&lon=${fivedayforecast.city.coord.lon}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    console.log(oneCall)

    // var uvIndex = 

    tempVal.textContent= oneCall.current.temp + " *Cel"
    // tempVal.textContent= oneCall.current.temp 
    // tempVal.textContent= oneCall.current.temp
    // tempVal.textContent= oneCall.current.temp
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