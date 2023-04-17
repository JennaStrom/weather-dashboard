//the button to start the search
var searchButton = document.querySelector('#search');
//A list made from the recent searches
var searchHistory = document.querySelector('#city-search-history');
//the weather display after you click search
var displayResults = document.querySelector('#display-weather-results');
var searchBarInput = document.querySelector('#search-bar');
var forecastContainer = document.querySelector('#forecast-container')

var APIKey = "6b32be2fe9073dbf3583f172c6f9d004";
var city;
var savedSearches = [];


function searchWeather() {
    var searchBarInput = document.querySelector('#search-bar');
    if (!savedSearches.includes(searchBarInput.value)) {
        savedSearches.push(searchBarInput.value)
        localStorage.setItem("cities", JSON.stringify(savedSearches));
    }
    displayResults.innerHTML = ''
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchBarInput.value + '&appid=6b32be2fe9073dbf3583f172c6f9d004&units=imperial')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var cityName = document.createElement("h2");
            var weatherImage = document.createElement("img");
            var currentTemp = document.createElement("h3");
            var currentHumidity = document.createElement("h3");
            var currentWindSpeed = document.createElement("h3");
            weatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            cityName.textContent = data.name;
            currentTemp.textContent = "Temp: " + data.main.temp + "ºF";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            currentWindSpeed.textContent = "Wind: " + data.wind.speed + " MPH";
            displayResults.appendChild(cityName);
            displayResults.appendChild(weatherImage);
            displayResults.appendChild(currentTemp);
            displayResults.appendChild(currentHumidity);
            displayResults.appendChild(currentWindSpeed);
        })

    fiveDayForecast();
    createSearchHistoryButtons();
}


//search button
searchButton.addEventListener('click', searchWeather);
//seach bar

//create a list of searched cities, that you can click to go back to
var createSearchHistoryButtons = function () {
    var pastSearches = JSON.parse(localStorage.getItem("cities"));
    console.log(pastSearches)
    searchHistory.innerHTML = ''
    for (var i = 0; i <= pastSearches.length; i++) {
        var buttonList = document.createElement("button")
        buttonList.textContent = pastSearches[i];
        searchHistory.appendChild(buttonList)

        buttonList.addEventListener('click', (e) => {
            var previousCityName = pastSearches[i]
            searchWeather(previousCityName)
            fiveDayForecast(previousCityName)
        })
    }
}





//Search results to include a five day forecast with pictures.
var fiveDayForecast = function (cityName) {
    var searchBarInput = document.querySelector('#search-bar');
    forecastContainer.innerHTML = ''
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchBarInput.value + '&appid=6b32be2fe9073dbf3583f172c6f9d004&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + APIKey + '&units=imperial&exclude=minutely,hourly,alerts&cnt=60')
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);

                    for (var i = 1; i <= 60; i += 9) {
                        var futureDate = document.createElement("h3")
                        var futureweatherImage = document.createElement("img");
                        var futureTemp = document.createElement("p");
                        var futureHumidity = document.createElement("p");
                        var futureWindSpeed = document.createElement("p");
                        futureDate.textContent = response.list[i].dt_txt
                        futureweatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                        futureTemp.textContent = "Temp: " + response.list[i].main.temp + "ºF";
                        futureHumidity.textContent = "Humidity: " + response.list[i].main.humidity + "%";
                        futureWindSpeed.textContent = "Wind: " + response.list[i].wind.speed + " MPH"
                        forecastContainer.appendChild(futureDate);
                        forecastContainer.appendChild(futureweatherImage);
                        forecastContainer.appendChild(futureTemp);
                        forecastContainer.appendChild(futureHumidity);
                        forecastContainer.appendChild(futureWindSpeed);
                    }
                })
        })
};
