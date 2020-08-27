var APIKey = "5f768f5ae7bdd6d4ec9a50a55e103f63"
// var userCity = $('#city-input');

//U
function URLFunction(cityName) {    
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
}

$('#submit-btn').on('click', function (event) {
    event.preventDefault();
    var city = $('#city-input').val().trim();
    var queryURL= URLFunction(city);
    console.log(queryURL);
     $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
    console.log(response);
       










    });
    
    
});