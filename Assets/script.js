var myCityList = [];

//use localstorage 

if (localStorage.getItem('city-info')) {
    myCityList = JSON.parse(localStorage.getItem('city-info'))
}




function callMyApi(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0e3c5873dedccebc8203c421fbb82ac0&units=imperial"
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        var currentWeatherMyDiv = $('#currentWeather');

        currentWeatherMyDiv.empty();
    // my var
    // my append
        var cityName = response.name
        var t1 = $('<h5>').text(cityName);
        var date = $('<h5>').text(moment().format("MM/DD/YYYY"));
        
        var icon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
        var showIcon = $('<img>').attr('src', icon);
        var temp = response.main.temp
        var t2 = $('<p>').text("Temperature: " + temp + "°F");
        var myHumidity = response.main.myHumidity
        var t3 = $('<p>').text('Humidity: ' + myHumidity + '%');

        var myWind = response.wind.speed
        var t4 = $('<p>').text('myWind: ' + myWind + 'MPH');
        currentWeatherMyDiv.append(t1, date, showIcon, t2, t3, t4);
    })

    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0e3c5873dedccebc8203c421fbb82ac0&units=imperial"
    $.ajax({
        url: queryURL2,
        method: 'GET'
    }).then(function (response2) {

        var forecastMyDiv = $('#5dayForecast');
        forecastMyDiv.empty();
        for (var i = 3; i < response2.list.length; i = i + 8) {
            var weatherObject = response2.list[i]

            var myDays = $('<h4>').text(moment(weatherObject.dt_txt).format('MM/DD/YYYY'))

            var icon = "http://openweathermap.org/img/wn/" + weatherObject.weather[0].icon + ".png"
            var showIcon = $('<img>').attr('src', icon);
            var temp = weatherObject.main.temp;
            var t5 = $('<p>').text("Temperature: " + temp + "°F")
            var myHumidity = weatherObject.main.myHumidity
            var t6 = $('<p>').text("Humidity: " + myHumidity + '%')
            var smallDiv = $('<div>').addClass('flex-child');
            smallDiv.append(myDays, showIcon, t5, t6)
            forecastMyDiv.append(smallDiv);

        }
    });
}

function displayWeather() {
    var city = $(this).attr('data-name');
    callMyApi(city);
}

function generateList() {
    $('#city-list').empty();

    for (var i = 0; i < myCityList.length; i++) {
        var c = $('<li>');
        c.addClass('city');
        c.attr('data-name', myCityList[i])
        c.text(myCityList[i]);
        $('#city-list').append(c);
    }
}
$('#searchBtn').on('click', function (event) {
    event.preventDefault();
    var city = $('#cityInput').val();
    myCityList.push(city);
    localStorage.setItem('city-info', JSON.stringify(myCityList));
    generateList();
    callMyApi(city);
});

$(document).on('click', '.city', displayWeather);
generateList();
