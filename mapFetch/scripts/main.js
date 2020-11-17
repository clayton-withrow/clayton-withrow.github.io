var clickLat;
var clickLon;
var countryCode;

function getCountryData() {
    fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        console.log(data);
        var countryName = data.name;
        var capital = data.capital;
        var region = data.region;
        var population = data.population;
        var currency = data.currencies[0].name;
        var language = data.languages[0].name;
        var flag = data.flag;

        document.getElementById("countryName").innerHTML = countryName;
        document.getElementById("capital").innerHTML = "Capital: " + capital;
        document.getElementById("region").innerHTML = "Region: " + region;
        document.getElementById("population").innerHTML = "Population: " + population;
        document.getElementById("currency").innerHTML = "Primary Currency: " + currency;
        document.getElementById("language").innerHTML = "Primary Language: " + language;
        document.getElementById("flag").src = flag;
    })
    .catch(function(error) {
        console.log(error);
    });
}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const mali = { lat: 17.5707, lng: 3.9962 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: mali,
    });


    google.maps.event.addListener(map, "click", function(event) {
        // get lat/lon of click
        clickLat = event.latLng.lat();
        clickLon = event.latLng.lng();

        // show in input box
        document.getElementById("lat").value = clickLat.toFixed(5);
        document.getElementById("lon").value = clickLon.toFixed(5);

        fetch(`http://api.geonames.org/countryCodeJSON?lat=${clickLat}&lng=${clickLon}&username=clayw42`)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            countryCode = data.countryCode;
            getCountryData();
        })
        .catch(function(error) {
            console.log(error);
        });
    });
}

