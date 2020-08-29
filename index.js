var APIKey = "5f768f5ae7bdd6d4ec9a50a55e103f63"

function URLFunction(cityName) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
}

$('#submit-btn').on('click', function (event) {
    event.preventDefault();

    var city = $('#city-input').val().trim();
    var queryURL = URLFunction(city);
    console.log(event);

    // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        var iconCode = response.weather[0].icon
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var kelvin = response.main.temp;
        fahrenheit = (kelvin - 273.15) * 1.8 + 32;
        // how to display weather icon -- https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon#:~:text=weather%5B0%5D.,%2F%22%20%2B%20iconcode%20%2B%20%22.
        $('#city').text(response.name);
        $('#temp').text('Temperature: ' + fahrenheit.toFixed(1) + ' \xB0F');
        $('#humidity').text('Humidity: ' + response.main.humidity + '%');
        $('#wind').text('Wind Speed: ' + response.wind.speed + " MPH");
        var iconImage = $('#image').attr('src', iconURL);

        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var APIKey = "5f768f5ae7bdd6d4ec9a50a55e103f63"
        var indexURL = indexFunction(latitude, longitude);

        //Ajax call that takes UV index response value and sets background of UV index
        $.ajax({
            url: indexURL,
            method: "GET"
        }).then(function (response2) {
            $('#UVIndex').text('UV Index: ' + response2.current.uvi)
            if (response2.current.uvi < 3) {
                $('#UVIndex').addClass('uvIndexGreen');
            }
            else if (response2.current.uvi >= 3 && response2.current.uvi < 6) {
                $('#UVIndex').addClass('uvIndexYellow');
            }
            else if (response2.current.uvi >= 6 && response2.current.uvi < 8) {
                $('#UVIndex').addClass('uvIndexOrange');
            }
            else if (response2.current.uvi >= 8) {
                $('#UVIndex').addClass('uvIndexRed');
            }
            console.log(response2);
            
            var dailyArray = response2.daily.slice(1, 6);
            // console.log(dailyArray);
            var fiveDayForecast = document.getElementById('five-day-forecast');
            dailyArray.forEach(function (currentElement, index, array) {
               // var newDiv= ''; // need to figure out how to clear div after each click
                var newDiv = document.createElement('div');
                var newH6 = document.createElement('h6');
                var newIMG = document.createElement('img');
                var newPTemp = document.createElement('p')
                var newPHumidity = document.createElement('p')
                var iconCode = currentElement.weather[0].icon;
                var iconForecastURL = "http://openweathermap.org/img/w/" +iconCode+ ".png"

                var forecastTimestamp = (currentElement.dt) *1000;
                var forecastDateObject= new Date(forecastTimestamp);
                var monthForecast = forecastDateObject.toLocaleString('en-US', {month: 'numeric'});
                var dayForecast = forecastDateObject.toLocaleString("en-US", { day: "numeric" });
                var yearForecast = forecastDateObject.toLocaleString("en-US", { year: "numeric" });
                console.log(currentElement);
                // newH6.innerHTML = convertTime(currentElement.dt)                
                 
                newH6.innerHTML =  monthForecast + '/' + dayForecast + "/" + yearForecast 
                newDiv.setAttribute('class', 'newDiv card text-white bg-primary mb-3 col-2');
                newIMG.setAttribute('class', 'icon');
                // console.log('CURRENT ELEMENT at ' + index + '-->', currentElement)
                // newH6.innerHTML ="Date: "+ currentElement.dt;
                newIMG.setAttribute('src', iconForecastURL);
                newPTemp.innerHTML = 'Temp: ' + ((currentElement.temp.max -273.15) * 1.8 +32).toFixed(1)+ ' \xB0F';
                newPHumidity.innerHTML = 'Humidity: ' + currentElement.humidity+'%';
               
                newDiv.appendChild(newH6);
                newDiv.appendChild(newIMG);
                newDiv.appendChild(newPTemp);
                newDiv.appendChild(newPHumidity);
                // console.log(currentElement.weather[0].icon);
                // console.log(iconForecastURL);

                fiveDayForecast.appendChild(newDiv)
            })
            // var dailyArray = response2.daily.slice(1,6);
            // console.log(dailyArray);
            // var dailyWeatherList = document.getElementById('daily-weather-list')
            // dailyArray.forEach(function(currentElement,index,array){
            //     var newListItem = document.createElement('li')
            //     newListItem.setAttribute('class', 'list-group-item')
            //     console.log('CURRENT ELEMENT at ' + index + '-->', currentElement)
            //     newListItem.innerHTML = currentElement.weather[0].description
            //     dailyWeatherList.appendChild(newListItem)
            // })
        });

        // function that takes lat & long from first ajax request and makes 2nd ajax call for UV index
        function indexFunction() {
            return `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
            exclude=minutely&appid=${APIKey}`
        }
        // Function that converts Unix Timestamp to readable date
        function convertTime(timestamp) {
            var unixTimestamp = (response.dt) * 1000;
            var dateObject = new Date(unixTimestamp);
            var monthDate = dateObject.toLocaleString("en-US", { month: "numeric" });
            var dayDate = dateObject.toLocaleString("en-US", { day: "numeric" });
            var yearDate = dateObject.toLocaleString("en-US", { year: "numeric" });
            $('#city').append(" (" + monthDate + '/' + dayDate + "/" + yearDate + ') ')
            //convert timestamp to date --- https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
        }
        convertTime();
        $('#city').append(iconImage);
    });
    // trying to set prepend local storage to page 
    var localStorage = window.localStorage;
    var dailyWeatherList = document.querySelector('#daily-weather-list')
    var inputCity = $('#city-input').val()
    // dailyWeatherList.forEach(function(citySelected){
        var newLI = document.createElement('li');
        localStorage.setItem('inputCity', JSON.stringify(inputCity));
        // newLI.innerHTML = ;
        console.log(inputCity);
        console.log(localStorage);
        newLI.innerHTML = inputCity;
        dailyWeatherList.prepend(newLI);

    // });
    
    


    // var lastCity = JSON.parse('inputCity');
    // var 
    // localStorage.getItem(inputCity);
    // $('#daily-weather-list').prepend(inputCity);
    // $('.list-group-item').prepend(inputCity);
     







});