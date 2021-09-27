
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
        console.log(iconUrl)
        cityVal.textContent= data.city.name
         iconVal.setAttribute("src", iconUrl);
         // iconVal.setAttribute("class","align-items-center")
         tempVal.textContent= cityData.current.temp + " °C"
         windVal.textContent= cityData.current.wind_speed + " KM/H" 
         humidVal.textContent= cityData.current.humidity + " %"
         uviVal.textContent= cityData.current.uvi
    })
};

// 7 day forecast -------------------------------------------------------------------
// day1
var forecastCard = document.querySelector(".forecast-card");

function fiveDayForecast(data) {
    console.log(data)
    forecastCard.innerHTML = "";
    for (var i = 8; i <=40; i+=8){
        // creating a card
        
        // var forecastCard = document.querySelector(".forcast-card")
        var weatherCard = document.createElement("div");
        var fiveDayData = document.createElement("ul");
        var date = document.createElement("li")
        var iconData = document.createElement("li")
        var iconImg = document.createElement("img")
        var tempData = document.createElement("li");
        var windData = document.createElement("li");
        var humidData = document.createElement("li");
        var uviData = document.createElement("li");

        // add content to the card from the data 
        var iconsUrl = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
        iconImg.setAttribute("src", iconsUrl);
        date.textContent = data.list[i].dt_txt;
        tempData.textContent = data.list[i].main.temp + " °C";
        windData.textContent = data.list[i].wind.speed + " KM/H";
        humidData.textContent = data.list[i].main.humidity + " %";
        uviData.textContent = data.list[i].main.uvi

        console.log(data.list[i].main.temp)
        // append card to the div 
        
        forecastCard.append(weatherCard);
        weatherCard.append(fiveDayData);
        fiveDayData.appendChild(date)
        iconData.appendChild(iconImg)
        fiveDayData.appendChild(iconData);
        fiveDayData.appendChild(tempData);
        fiveDayData.appendChild(windData);
        fiveDayData.appendChild(humidData);
        // weatherCard.append(forecastCard)

    }
    
}
// fiveDayForecast()

// function searchHistory() {
//     // store search history in local
//     for (var i = 0; i <=4; i++){
//     recentSearch = JSON.stringify()
//     localStorage.setItem("city", JSON.stringify(recentSearch));

//     // creates a button
//     searchHistoryCard = document.createElement("button")

//     // parse recent search to button just created
//     var searchHistoryCard = JSON.parse(localStorage.getItem(recentSearch))
//     document.getElementById("city-card").append(button)

//     // 

//     }
// }

// local storage.JSON("city")
// oneCall()
//     - tempVal, windVal, humidVal, uviVal
// fiveDayForecast()
//     - tempVal, windVal, humidVal, uviVal

// parse cityName to display
// var highscoreList = JSON.parse(localStorage.getItem("HighscoreList"))

// for (let i = 0; i < highscoreList.length; i++) {
//     var paragraph = document.createElement("p")
//     paragraph.textContent = highscoreList[i].initials + " " + highscoreList[i].finalScore
//     document.getElementById("highscore").append(paragraph)
// }

// var cityVal = document.querySelector("#city")

// document.creatElement("li");
// citySearch.textContent
// searchHistory.append(cityVal)













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