
const weatherAPIKey = "5666c4c14907952edf5f47bf61b14bd9";
const geocodeAPIKey = "AIzaSyDpJsYiCtBTAo5x5-ABdGlx38lrhSOgR4M";
let unit = "metric";
let temp = 0;

$(document).ready(function() {
  
  $("#changeunit").on("click", function() {
    if(unit == "metric") {
      unit = "imperial";
      $("#temp").html((temp * 1.8 + 32).toFixed(1) + "°F");
    }else if(unit == "imperial") {
      unit = "metric";
      $("#temp").html(temp.toFixed(1) + "°C");
    }
  });
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        let latlonString = position.coords.latitude + "," + position.coords.longitude;
        fromLatLon(latlonString);
      },
      showError,
      {enableHighAccuracy:false, timeout:5000, maximumAge:0}
    );
  }
});

function fromLatLon(latlonString){

  let APIEndpoint = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latlonString+"&key="+geocodeAPIKey;
  $.getJSON(
    APIEndpoint,
    function(json){
      $("#location").html(json.results[2].formatted_address);
      console.log(json.results[2].formatted_address);
      getWeather(latlonString);
    });
}

function fromLocation(loc){
  if (typeof loc == 'undefined'){
    loc = $("#locinput").val();
  }
  let APIEndpoint = "https://maps.googleapis.com/maps/api/geocode/json?address="+loc+"&key="+geocodeAPIKey;
  console.log(APIEndpoint);
  $.getJSON(
    APIEndpoint,
    function(json){
      $("#location").html(json.results[0].formatted_address);
      let latlonString = json.results[0].geometry.location.lat + "," + json.results[0].geometry.location.lng;
      console.log(json.results[0].formatted_address);
      getWeather(latlonString);
    });
}

function getWeather(latlonString){

  let weatherAPIEndpoint = "https://api.darksky.net/forecast/"+WEATHERAPIKEY+"/"+latlonString+"?units=ca&callback=";
  console.log(weatherAPIEndpoint);
  $.getJSON(
    weatherAPIEndpoint,
    function(json) {
      temp = json.currently.temperature;
      let weather = json.hourly.summary; 
      let wind = getWindDirection(json.currently.windBearing, json.currently.windSpeed);
      //$("#location").html(loc);
      $("#weather").html(weather);
      $("#wind").html(wind);
      $("#temp").html(temp.toFixed(1) + " °C");
      setSkyConWallpaper(json.currently.icon);
    }
  );
}

function showError(error){
  switch(error.code) {
    case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation. Please enter location in search box.");
        break;
    case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable. Please enter location in search box.");
        break;
    case error.TIMEOUT:
        alert("The request to get user location timed out. Please enter location in search box.");
        break;
    case error.UNKNOWN_ERROR:
        alert("An unknown error occurred. Please try entering location in search box.");
        break;
    }
}

function getWindDirection(winddeg, windspeed){
  let wind = "";
  if (winddeg == 90)
    wind = "E";
  else if (winddeg == 180)
    wind = "S";
  else if (winddeg == 270)
    wind = "W";
  else if (winddeg == 360)
    wind = "N";
  else if (winddeg < 90)
    wind = "NE";
  else if (winddeg < 180)
    wind = "SE";
  else if (winddeg < 270)
    wind = "SW";
  else if (winddeg < 360)
    wind = "NW";
  
  wind += " " + windspeed + " knots";
  return wind;
}

function setSkyConWallpaper(icon){
  let skycons = new Skycons();
  skycons.add("wicon",icon);
  skycons.play();
  switch (icon) {
    case "clear-day":
      $("body").css("background", "url(images/clear_day.jpg) no-repeat");
      break;
    case "clear-night":
      $("body").css("background", "url(images/clear_night.jpg) no-repeat");
      break;
    case "rain":
      $("body").css("background", "url(images/rain.jpg) no-repeat");
      break;
    case "snow":
      $("body").css("background", "url(images/snow.jpg) no-repeat");
      break;
    case "sleet":
      $("body").css("background", "url(images/sleet.jpg) no-repeat");
      break;
    case "wind":
      $("body").css("background", "url(images/wind.jpg) no-repeat");
      break;
    case "fog":
      $("body").css("background", "url(images/fog.jpg) no-repeat");
      break;
    case "cloudy":
      $("body").css("background", "url(images/cloudy.jpg) no-repeat");
      break;
    case "partly-cloudy-day":
      $("body").css("background", "url(images/cloudy.jpg) no-repeat");
      break;
    case "partly-cloudy-night":
      $("body").css("background", "url(images/cloudy_night.jpg) no-repeat");
      break;
    default:
      $("body").css("background", "url(images/default.jpg) no-repeat");
  }
}

