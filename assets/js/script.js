
// gitignore the APIkey
var APIkey = "e25845a4dbea1389264f9b820c89ea63" 
var fivedayforecast = ""
var locationEl = document.querySelector("#location");
var tempVal = document.querySelector("#temp");
var humidVal = document.querySelector("#humid");
var windVal = document.querySelector("#windsp");
var uviVal = document.querySelector("#uvi");
var cityVal = document.querySelector("#city")
var iconVal = document.querySelector("#icon")


function getWeatherData(data) {
    var data = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationEl.value}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    .then((data)=>{
        console.log(data)
        oneCall(data);
        fiveDayForecast(data);
    })
}

function oneCall(data) {
    var oneCall = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    .then((cityData) =>{    
        var iconUrl = `https://openweathermap.org/img/w/${cityData.current.weather[0].icon}.png`;
        console.log(oneCall)
        // console.log(iconUrl)
        cityVal.textContent= data.city.name
         iconVal.setAttribute("src", iconUrl);
         // iconVal.setAttribute("class","align-items-center")
         tempVal.textContent= cityData.current.temp + " °C"
         windVal.textContent= cityData.current.wind_speed + " KM/H" 
         humidVal.textContent= cityData.current.humidity + " %"
         uviVal.textContent= cityData.current.uvi
    })
};

console.log(cityVal)
// 7 day forecast -------------------------------------------------------------------
// day1

function fiveDayForecast(data) {
    console.log(data)
    for (var i = 6; i <=40; i+=6){
        // creating a card
        
        // var forecastCard = document.querySelector(".forcast-card")
        var weatherCard = document.createElement("div");
        var fiveDayData = document.createElement("ul");
        var iconData = document.createElement("li")
        var tempData = document.createElement("li");
        var windData = document.createElement("li");
        var humidData = document.createElement("li");
        var uviData = document.createElement("li");

        // add content to the card from the data 
        tempData.textContent = data.list[i].main.temp + " °C"
        windData.textContent = data.list[i].main.wind_speed + " KM/H" 
        humidData.textContent = data.list[i].main.humidity + " %"
        uviData.textContent = data.list[i].main.uvi

        console.log(data.list[i].main.temp)
        // append card to the div 
        var forecastCard = document.querySelector(".forecast-card");
        forecastCard.append(weatherCard);
        weatherCard.append(fiveDayData);
        fiveDayData.appendChild(iconData);
        fiveDayData.appendChild(tempData);
        fiveDayData.appendChild(windData);
        fiveDayData.appendChild(humidData);
        fiveDayData.appendChild(uviData);
        // weatherCard.append(forecastCard)
    }
    
}
// fiveDayForecast()

locationEl.addEventListener("keydown", function(event){
    if (event.keyCode === 13){
        getWeatherData();
    }
})


// Time Display/Refresh ------------------------------------------------------------------
var time = moment();
$("#time-display").text(time.format('dddd, MMM Do YYYY, h:mm:ss a'));


function currentTime(){
    var time = moment();
    $("#time-display").text(time.format('dddd, MMM Do YYYY, h:mm:ss a'));
    var currentHour = moment().hour();

};
 setInterval(currentTime,1000);