var APIKey = "5f768f5ae7bdd6d4ec9a50a55e103f63"
// var userCity = $('#city-input');

//U
function URLFunction(cityName) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
}

$('#submit-btn').on('click', function (event) {
    event.preventDefault();
    var city = $('#city-input').val().trim();
    var queryURL = URLFunction(city);
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var kelvin = response.main.temp;
        fahrenheit = (kelvin - 273.15) * 1.8 + 32;
        console.log(fahrenheit);
        $('#city').text(response.name);
        $('#temp').text('Temperature: ' + fahrenheit.toFixed(1) + ' \xB0F');
        $('#humidity').text('Humidity: ' + response.main.humidity + '%');
        $('#wind').text('Wind Speed: '+ response.wind.speed + " MPH");
        var latitude= response.coord.lat;
        var longitude= response.coord.lon;
        console.log(latitude);
        console.log(longitude);
        
        
    });
});