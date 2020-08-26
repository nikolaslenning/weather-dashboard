var userCity = []
var userCityString = userCity.toString();
var APIKey= "5f768f5ae7bdd6d4ec9a50a55e103f63"
queryURL= "api.openweathermap.org/data/2.5/weather?q="+ userCity +"&appid="+ APIKey;







console.log(userCity);    
console.log(userCityString);    




$('#submit-btn').on('click', function(event){
    event.preventDefault();
    var city = $('#city-input').val().trim();
    userCity.push(city);
    console.log(userCity);    
    console.log(userCityString);    
});