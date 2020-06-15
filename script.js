$( document ).ready(function() {



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
    function clear() {
        $("#forecast").empty();
        $("#forecastRow").empty();
        // $(".forecast").empty();
        $("#fiveDayForecast").empty();
        $("#search-value").val("");

    };

    function ajaxCall() {

        var queryURL = "https://api.weatherapi.com/v1/forecast.json?key=" + window.API_Key + "&days=7" + "&q=" + userInput;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(data) {

            // clear forecast body
            clear();

            console.log(data);
            var location = $("#location");
            var listHistory = $(".list-group");
            if (location) {
                var list = $("<li>");
                list.addClass("list");
                list.attr("id", data.location.name);
                list.text(data.location.name);
                listHistory.prepend(list);
            }
            // $("#p7menubar > li:nth-child(9) > .trigger").attr("id","MyNewID");


            // putting data from AJAX to the forecast body
            location.text(data.location.name + ", " + data.location.country);
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

            // 3-5 days forecast
            var forecastRowTitle = $("<div>");
            forecastRowTitle.addClass("col-lg-12 forecast").css({"font-size": "30px", "color": "blue", "padding": "20px"});
            forecastRowTitle.text(data.forecast.forecastday.length + "-day Forecast:");

            $("#fiveDayForecast").prepend(forecastRowTitle);


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
                // $("#forecastRow").append(forecastCol);
                $("#fiveDayForecast").append(forecastCol);
            }
        })
    }

    const searchElement = $("#search-button");
    searchElement.click( function () {
        userInput = $("#search-value").val();
        ajaxCall();
        
    });



    $("#cityList").on("click", ".list", function () {
        userInput = $(this).attr("id");
        console.log(userInput);
        clear();
        ajaxCall();
        
    })
});