var APIKey = "5f768f5ae7bdd6d4ec9a50a55e103f63"

function URLFunction(cityName) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
}

$('#submit-btn').on('click', function (event) {
    event.preventDefault();
    var city = $('#city-input').val().trim();
    var queryURL = URLFunction(city);


    // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var iconCode = response.weather[0].icon
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var kelvin = response.main.temp;
        fahrenheit = (kelvin - 273.15) * 1.8 + 32;
        // how to display weather icon -- https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon#:~:text=weather%5B0%5D.,%2F%22%20%2B%20iconcode%20%2B%20%22.
        $('#city').text(response.name);
        $('#temp').text('Temperature: ' + fahrenheit.toFixed(1) + ' \xB0F');
        $('#humidity').text('Humidity: ' + response.main.humidity + '%');
        $('#wind').text('Wind Speed: ' + response.wind.speed + " MPH");
        $('#image').attr('src', iconURL);

        console.log(response.weather[0].icon);
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var APIKey = "5f768f5ae7bdd6d4ec9a50a55e103f63"
        var indexURL = indexFunction(latitude, longitude);
        console.log(indexURL);

        $.ajax({
            url: indexURL,
            method: "GET"
        }).then(function (response2) {
            console.log(response2)
            $('#UVIndex').text('UV Index: ' + response2.current.uvi)
            if (response2.current.uvi < 3) {
                $('#UVIndex').addClass('uvIndexGreen');
            }
            else if (response2.current.uvi >= 3 && response2.current.uvi < 6) {
                $('#UVIndex').addClass('uvIndexYellow')
            }
            else if (response2.current.uvi >= 6 && response2.current.uvi < 8) {
                $('#UVIndex').addClass('uvIndexOrange')
            }
            else if (response2.current.uvi >= 8) {
                $('#UVIndex').addClass('uvIndexRed')
            }
        });


        function indexFunction() {
            return `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
            exclude=minutely&appid=${APIKey}`
        }
        function convertTime(timestamp) {
            var unixTimestamp = (response.dt) * 1000;
            var dateObject = new Date(unixTimestamp);
            console.log(dateObject);
            var dateFormat = dateObject.toLocaleString()
            console.log(dateFormat);
            dateObject.toLocaleString("en-US", { month: "numeric" }) 
            dateObject.toLocaleString("en-US", { day: "numeric" })
            dateObject.toLocaleString("en-US", { year: "numeric" })
            //convert timestamp to date --- https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
        }
        convertTime();
    });
});