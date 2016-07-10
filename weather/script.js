var unit="metric",temp;
$(document).ready(function() {
  $("#changeunit").on("click", function() {
    if (unit == "metric") {
      unit = "imperial";
      temp = (temp * 1.8 + 32).toFixed(1);
      $("#temp").html(temp + "°F");
    } else if (unit == "imperial") {
      unit = "metric";
      temp = ((temp - 32) / 1.8).toFixed(1);
      $("#temp").html(temp + "°C");
    }
  });
  $("#locsubmit").on("click",getweather($("#locinput").html));
});
function getweather(){
  var skycons = new Skycons();
  console.log("started");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $.getJSON("https://api.forecast.io/forecast/5666c4c14907952edf5f47bf61b14bd9/" + position.coords.latitude + "," + position.coords.longitude + "?units=si&callback=?", function(json) {
        temp = json.currently.temperature.toFixed(1);
        var icon = json.currently.icon;
        var loc = "testloc";//json.name + ',' + json.sys.country;
        var weather = json.hourly.summary; 
        var wind = "";
        var winddeg = json.currently.windBearing;
        if (winddeg == 90)
          wind += "E";
        else if (winddeg == 180)
          wind += "S";
        else if (winddeg == 270)
          wind += "W";
        else if (winddeg == 360)
          wind += "N";
        else if (winddeg < 90)
          wind += "NE";
        else if (winddeg < 180)
          wind += "SE";
        else if (winddeg < 270)
          wind += "SW";
        else if (winddeg < 360)
          wind += "NW";
        wind += " " + json.currently.windSpeed + " knots";
        $("#location").html(loc);
        $("#weather").html(weather);
        $("#wind").html(wind);
        $("#temp").html(temp + "°C");
        skycons.add("wicon",icon);
		skycons.play();
        //$("#test").html(JSON.stringify(json));
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
        $("body").css("background-size", "cover");
      });
    },function(error) {
      //$("#location").html(error.code);
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
      
},{ enableHighAccuracy:false,timeout:5000,maximumAge:0});
  }
}
