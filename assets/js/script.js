
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
var searchHistoryContainer = document.querySelector("#search-history")
var storageSearchHistory= [];

function getWeatherData(data) {
    var data = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationEl.value}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    .then((data)=>{
        console.log(data)
        storageSearchHistory.push(locationEl.value);
        localStorage.setItem("cities", JSON.stringify(storageSearchHistory));
        console.log(storageSearchHistory)
        renderSearchHistory();
        oneCall(data);
        fiveDayForecast(data);
    })
}

function oneCall(data) {
    var oneCall = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    .then((cityData) =>{    
        var iconUrl = `https://openweathermap.org/img/w/${cityData.current.weather[0].icon}.png`;
        console.log(iconUrl)
        cityVal.textContent= data.city.name
         iconVal.setAttribute("src", iconUrl);
         // iconVal.setAttribute("class","align-items-center")
         tempVal.textContent= cityData.current.temp + " °C"
         windVal.textContent= cityData.current.wind_speed + " KM/H" 
         humidVal.textContent= cityData.current.humidity + " %"
         uviVal.textContent= cityData.current.uvi
         displayUVIndex()
    })
};

// 7 day forecast -------------------------------------------------------------------
// day1
var forecastCard = document.querySelector(".forecast-card");

function fiveDayForecast(data) {

    forecastCard.innerHTML = "";
    for (var i = 7; i <=40; i+=8){

        
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
        var iconsUrl =`https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
        iconImg.setAttribute("src", iconsUrl);
        date.textContent = data.list[i].dt_txt;
        // date = data.list[i].split(" ");---------------------------------------------
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

function displayUVIndex(){
    var index = parseInt(uviVal.innerHTML)
    var ultraviolet = $("#uvi")
    if(index <= 3.99) {
     // if > currentHour, text area is grey
        ultraviolet.addClass ("green");
     // removeClass ensures there are no conflicts
        ultraviolet.removeClass("yellow");
        ultraviolet.removeClass("red");
        console.log($(this))
    } else if (index >= 4 && index <=7 ) {
    
        ultraviolet.removeClass ("green");
        ultraviolet.addClass("yellow");
        ultraviolet.removeClass("red");

    } else {
        ultraviolet.removeClass ("green");
        ultraviolet.removeClass("yellow");
        ultraviolet.addClass("red");
    };      
}




function renderSearchHistory() {
    searchHistoryContainer.innerHTML = '';
    searchHistory = JSON.parse(localStorage.getItem("cities"))
    // Start at end of history array and count down to show the most recent at the top.
    for (var i = 0; i < searchHistory.length; i++) {
      var btn = document.createElement('button');
      

      // `data-search` allows access to city name when click handler is invoked
      btn.setAttribute('data-search', searchHistory[i]);
      btn.textContent = searchHistory[i];
      searchHistoryContainer.append(btn);
    }
}

function handleSearchHistoryClick(e) {

    var btn = e.target;
    var search = btn.getAttribute('data-search');
    getWeatherData();
    oneCall()
    fiveDayForecast()
    
}


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