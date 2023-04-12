//the city that is searched in the input bar
var searchBarInput = document.querySelector('#search-bar');
//the button to start the search
var searchButton = document.querySelector('#search');
//A list made from the recent searches
var searchHistory = document.querySelector('#city-search-history');
//the weather display after you click search
var displayResults = document.querySelector('#display-weather-results');

var APIKey = "6b32be2fe9073dbf3583f172c6f9d004";
var city;
var savedSearches = [];

//this is working to fetch and console log data...need to use this to search the city and pull the lat/long codes from.
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=6b32be2fe9073dbf3583f172c6f9d004')
 .then(response => response.json())
 .then(data => console.log(data))

 //this is a mess.
var currentWeather = function (event) {
  event.preventDefault();
  var city = searchBarInput.value.trim();

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
    //.then(function )

}
console.log(fetch)
//search button
searchButton.addEventListener('submit', currentWeather);
//seach bar

//create a list of searched cities, that you can click to go back to

//create container for results to show including a five day forecast with pictures.