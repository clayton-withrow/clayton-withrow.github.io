//Initial Code

function unixConversion(timestamp){
    const unixTimestamp = timestamp;

    const milliseconds = unixTimestamp * 1000;

    const dateObject = new Date(milliseconds);

    const dayOfTheWeek = (dateObject.toLocaleString("en-US", {weekday: "long"})).substring(0,3);
    const month = (dateObject.toLocaleString("en-US", {month: "long"})).substring(0,3);
    const day = dateObject.toLocaleString("en-US", {day: "numeric"});
    const date = dayOfTheWeek + ", " + month + " " + day;

    return date;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
        } 
    else {
         alert("Geolocation is not supported by this browser.");
        }
}

function setPosition(position) {
    var currentLatitude = position.coords.latitude;
    var currentLongitude = position.coords.longitude;
    var httpRequest;

    // Initialize and add the map
    function initMap() {
        // The location of user.
        const currentPosition = { lat: currentLatitude, lng: currentLongitude };
        // The map, centered at user's location.
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: currentPosition,
        });
        // The marker, positioned at user's location.
        const marker = new google.maps.Marker({
            position: currentPosition,
            map: map,
        });
    }

    function makeRequest() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
            }

            httpRequest.onreadystatechange = displayContents;
            httpRequest.open('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLatitude}&lon=${currentLongitude}&exclude=hourly&appid=7d202ff2d5eb9701ae1bf4984ecb739a`);
            httpRequest.send();
    }

    function displayContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

                var obj = JSON.parse(httpRequest.responseText);

                //Current Info
                var tempF = Math.round((9/5)*(obj.current.temp - 273) + 32);
                var tempC = Math.round(obj.current.temp - 273.15);
                var tempString = "Temperature: " + tempF + "\u00B0 F / " + tempC + "\u00B0 C";
                var humidity = obj.current.humidity;
                var humidityString = "Humidity: " + humidity + "%";
                var windSpeed = Math.round((obj.current.wind_speed) * 2.237);
                var windSpeedString = "Wind Speed: " + windSpeed + "mph";
                var description = obj.current.weather[0].description;
                var icon = obj.current.weather[0].icon;
                var iconString = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                document.getElementById("currentTemp").innerHTML = tempString;
                document.getElementById("currentHumidity").innerHTML = humidityString;
                document.getElementById("currentWindSpeed").innerHTML = windSpeedString;
                document.getElementById("currentDescription").innerHTML = description;
                document.getElementById("currentIcon").src = iconString;

                //Forecast Info
                var todayTempF = Math.round((9/5)*(obj.daily[0].temp.day - 273) + 32);
                var todayTempC = Math.round(obj.daily[0].temp.day - 273.15);
                var todayTempString = "Today: " + todayTempF + "\u00B0 F / " + todayTempC + "\u00B0 C";

                var day2date = unixConversion(obj.daily[1].dt);
                var day2TempF = Math.round((9/5)*(obj.daily[1].temp.day - 273) + 32);
                var day2TempC = Math.round(obj.daily[1].temp.day - 273.15);
                var day2TempString = day2date + ": " + day2TempF + "\u00B0 F / " + day2TempC + "\u00B0 C";

                var day3date = unixConversion(obj.daily[2].dt);
                var day3TempF = Math.round((9/5)*(obj.daily[2].temp.day - 273) + 32);
                var day3TempC = Math.round(obj.daily[2].temp.day - 273.15);
                var day3TempString = day3date + ": " + day3TempF + "\u00B0 F / " + day3TempC + "\u00B0 C";

                var day4date = unixConversion(obj.daily[3].dt);
                var day4TempF = Math.round((9/5)*(obj.daily[3].temp.day - 273) + 32);
                var day4TempC = Math.round(obj.daily[3].temp.day - 273.15);
                var day4TempString = day4date + ": " + day4TempF + "\u00B0 F / " + day4TempC + "\u00B0 C";

                var day5date = unixConversion(obj.daily[4].dt);
                var day5TempF = Math.round((9/5)*(obj.daily[4].temp.day - 273) + 32);
                var day5TempC = Math.round(obj.daily[4].temp.day - 273.15);
                var day5TempString = day5date + ": " + day5TempF + "\u00B0 F / " + day5TempC + "\u00B0 C";

                var day6date = unixConversion(obj.daily[5].dt);
                var day6TempF = Math.round((9/5)*(obj.daily[5].temp.day - 273) + 32);
                var day6TempC = Math.round(obj.daily[5].temp.day - 273.15);
                var day6TempString = day6date + ": " + day6TempF + "\u00B0 F / " + day6TempC + "\u00B0 C";

                document.getElementById("today").innerHTML = todayTempString;
                document.getElementById("day2").innerHTML = day2TempString;
                document.getElementById("day3").innerHTML = day3TempString;
                document.getElementById("day4").innerHTML = day4TempString;
                document.getElementById("day5").innerHTML = day5TempString;
                document.getElementById("day6").innerHTML = day6TempString;

            } else {
                alert('There was a problem with the request.');
            }
        }
    }

    makeRequest();
    initMap();
}

//Search Code

function search(){
    var input = document.getElementById("citySearch").value;

    if (input === ""){
        input = "Tokyo";
    }

    document.getElementById("cityNameSearch").innerHTML = input;
    document.getElementById("currentTitleSearch").innerHTML = "Current Weather:";

    function makeSearchRequest() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
            }

            httpRequest.onreadystatechange = displaySearch;
            httpRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=7d202ff2d5eb9701ae1bf4984ecb739a`);
            httpRequest.send();
    }

    function displaySearch() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                console.log(httpRequest.responseText);

                var obj = JSON.parse(httpRequest.responseText);

                //Current Info
                var tempFSearch = Math.round((9/5)*(obj.main.temp - 273) + 32);
                var tempCSearch = Math.round(obj.main.temp - 273.15);
                var tempStringSearch = "Temperature: " + tempFSearch + "\u00B0 F / " + tempCSearch + "\u00B0 C";
                var humiditySearch = obj.main.humidity;
                var humidityStringSearch = "Humidity: " + humiditySearch + "%";
                var windSpeedSearch = Math.round((obj.wind.speed) * 2.237);
                var windSpeedStringSearch = "Wind Speed: " + windSpeedSearch + "mph";
                var descriptionSearch = obj.weather[0].description;

                document.getElementById("currentTempSearch").innerHTML = tempStringSearch;
                document.getElementById("currentHumiditySearch").innerHTML = humidityStringSearch;
                document.getElementById("currentWindSpeedSearch").innerHTML = windSpeedStringSearch;
                document.getElementById("currentDescriptionSearch").innerHTML = descriptionSearch;

                currentLatitude = obj.coord.lat;
                currentLongitude = obj.coord.lon;

                // Initialize and add the map
                function initMap() {
                    // The location of user.
                    const currentPosition = { lat: currentLatitude, lng: currentLongitude };
                    // The map, centered at user's location.
                    const map = new google.maps.Map(document.getElementById("map"), {
                        zoom: 8,
                        center: currentPosition,
                    });
                    // The marker, positioned at user's location.
                    const marker = new google.maps.Marker({
                        position: currentPosition,
                        map: map,
                    });
                }

                initMap();

            } else {
                alert('There was a problem with the request.');
            }
        }
        
    }

    makeSearchRequest();
}