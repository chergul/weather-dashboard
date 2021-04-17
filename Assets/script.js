var cityList = [];
//use localstorage to store and get data on click  
if (localStorage.getItem('city-info')) {
    cityList = JSON.parse(localStorage.getItem('city-info'))
}

function callAPI(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0e3c5873dedccebc8203c421fbb82ac0&units=imperial"
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        var currentWeatherDiv = $('#currentWeather');
        currentWeatherDiv.empty();
        var cityName = response.name
        var t1 = $('<h5>').text(cityName);
        var date = $('<h5>').text(moment().format("MM/DD/YYYY"));
        var icon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
        var showIcon = $('<img>').attr('src', icon);
        var temp = response.main.temp
        var t2 = $('<p>').text("Temperature: " + temp + "°F");
        var humidity = response.main.humidity
        var t3 = $('<p>').text('Humidity: ' + humidity + '%');
        var windspeed = response.wind.speed
        var t4 = $('<p>').text('Windspeed: ' + windspeed + 'MPH');
        currentWeatherDiv.append(t1, date, showIcon, t2, t3, t4);
    })
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=07c55abb142d07d64c38ec8a22379edc&units=imperial"
    $.ajax({
        url: queryURL2,
        method: 'GET'
    }).then(function (response2) {

        var forecastDiv = $('#5dayForecast');
        forecastDiv.empty();
        for (var i = 3; i < response2.list.length; i = i + 8) {
            var weathObj = response2.list[i]
            var days = $('<h4>').text(moment(weathObj.dt_txt).format('MM/DD/YYYY'))
            var icon = "http://openweathermap.org/img/wn/" + weathObj.weather[0].icon + ".png"
            var showIcon = $('<img>').attr('src', icon);
            var temp = weathObj.main.temp;
            var t5 = $('<p>').text("Temperature: " + temp + "°F")
            var humidity = weathObj.main.humidity
            var t6 = $('<p>').text("Humidity: " + humidity + '%')
            var smallDiv = $('<div>').addClass('flex-child');
            smallDiv.append(days, showIcon, t5, t6)
            forecastDiv.append(smallDiv);

        }
    });
}

function displayWeather() {
    var city = $(this).attr('data-name');
    callAPI(city);
}

function generateList() {
    $('#city-list').empty();

    for (var i = 0; i < cityList.length; i++) {
        var c = $('<li>');
        c.addClass('city');
        c.attr('data-name', cityList[i])
        c.text(cityList[i]);
        $('#city-list').append(c);
    }
}
$('#searchBtn').on('click', function (event) {
    event.preventDefault();
    var city = $('#cityInput').val();
    cityList.push(city);
    localStorage.setItem('city-info', JSON.stringify(cityList));
    generateList();
    callAPI(city);
});

$(document).on('click', '.city', displayWeather);
generateList();
