// $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
$("#currentDay").text(moment().format('LLL')); 

var userInput = ""
// var API_Key = "AIzaSyDLg0h8zDLyv1VP0PhbepucrbsQxQ1jFao";
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=" + API_Key;
// // var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}"



// const searchElement = document.getElementById("search-value");
// const searchBox = new google.maps.places.SearchBox(searchElement);
// searchBox.addListener("places_changed", () => {
//     const place = searchBox.getPlaces()[0]
//     if (place == null) return
//     const lat = place.geometry.location.lat();
//     const lon = place.geometry.location.lng();
//     fetch("/weather", {
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             latitude: lat,
//             longitude: lon,
//         })
//     }).then(res => res.json()).then(data => {
//         setWeatherData(data, place.formatted_address)
//     })
//     console.log(lon, lat);
// })

const searchElement = $("#search-button");
searchElement.click( function () {
    userInput = $("#search-value").val();
    var queryURL = "https://api.weatherapi.com/v1/forecast.json?key=" + window.API_Key + "&days=7" + "&q=" + userInput;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data) {
        $("#forecast").empty();
        console.log(data);
        $("#location").text(data.location.name + ", " + data.location.country);
        var temp = $("<p>");
        temp.attr("id", "humid");
        temp.text("Temperature: " + data.current.temp_c + " C / " + data.current.temp_f + " F");
        $("#forecast").append(temp);
        var humid = $("<p>");
        humid.attr("id", "humid");
        humid.text("Humidity: " + data.current.humidity);
        $("#forecast").append(humid);
        var wind = $("<p>");
        wind.attr("id", "wind");
        wind.text("Wind Speed: " + data.current.wind_mph + " mph");
        $("#forecast").append(wind);
        var uv = $("<p>");
        uv.attr("id", "uv");
        uv.text("UV Index: " + data.current.uv);
        $("#forecast").append(uv);

        for ( var i = 0; i < data.forecast.forecastday.length; i ++) {
            var forecastCol = $("<div>");
            forecastCol.addClass("col-md-" + data.forecast.forecastday.length);
            var forecastP = $("<p>");
            forecastP.text("Date: " + data.forecast.forecastday[i].date)
            var forecastTC = $("<p>");
            forecastTC.text("Temperature: " + data.forecast.forecastday[i].day.maxtemp_c + " C / " + data.forecast.forecastday[i].day.maxtemp_f + " F");
            var forecastHum = $("<p>");
            forecastHum.text("Humidity: " + data.forecast.forecastday[i].day.avghumidity);
            forecastCol.append(forecastP, forecastTC, forecastHum);
            $("#forecastRow").append(forecastCol);
        }
        

    })
    
    
});

