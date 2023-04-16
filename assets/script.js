

//the button to start the search
var searchButton = document.querySelector('#search');
//A list made from the recent searches
var searchHistory = document.querySelector('#city-search-history');
//the weather display after you click search
var displayResults = document.querySelector('#display-weather-results');

var APIKey = "6b32be2fe9073dbf3583f172c6f9d004";
var city;
var savedSearches = [];


function searchWeather() {
    var searchBarInput = document.querySelector('#search-bar');
    var pastSearches = localStorage.getItem("cities")
    if (!savedSearches.includes(searchBarInput.value)) {
        savedSearches.push(searchBarInput.value)
        localStorage.setItem("cities", savedSearches)
         var searchHistoryButtons = document.createElement("button")
         searchHistory.textContent = pastSearches;
         searchHistory.appendChild(searchHistoryButtons)
         pastSearches = json.parse(searchHistory)
    }
    displayResults.innerHTML = ''
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchBarInput.value + '&appid=6b32be2fe9073dbf3583f172c6f9d004&units=imperial')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var cityName = document.createElement("h2")
            var weatherImage = document.createElement("img")
            var currentTemp = document.createElement("h3")
            var currentHumidity = document.createElement("h3")
            weatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
            cityName.textContent = data.name
            currentTemp.textContent = "Temp: " + data.main.temp + "ºF"
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%"
            displayResults.appendChild(cityName)
            displayResults.appendChild(weatherImage)
            displayResults.appendChild(currentTemp)
            displayResults.appendChild(currentHumidity)

        })
}


//search button
searchButton.addEventListener('click', searchWeather);
//seach bar

//create a list of searched cities, that you can click to go back to

//create container for results to show including a five day forecast with pictures.