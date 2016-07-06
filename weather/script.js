var unit="metric",temp;
$(document).ready(function() {
  getweather();
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
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=" + unit + "&appid=" + "dc4d96c1bd1b1083127cd3615cdecf8b", function(json) {
        temp = json.main.temp.toFixed(1);
        var iconurl = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
        var weathermain = json.weather[0].main;
        var location = json.name + ',' + json.sys.country;
        var weather = json.weather[0].description;
        var wind = "";
        var winddeg = json.wind.deg;
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
        wind += " " + json.wind.speed + " knots";
        $("#location").html(location);
        $("#weather").html(weather);
        $("#wind").html(wind);
        $("#temp").html(temp + "°C");
        $("#wicon").attr("src", iconurl);
        $("#test").html(JSON.stringify(json));
        switch (weathermain) {
          case "Clear":
            $("body").css("background", "url(images/clear.jpg) no-repeat");
            break;
          case "Thunder":
            $("body").css("background", "url(http://wallbeast.com/wp-content/uploads/2015/08/thunderstorm_3_cool_nature_wallpaper.jpg) no-repeat");
            break;
          case "Clouds":
            $("body").css("background", "url(http://cdn.superbwallpapers.com/wallpapers/photography/cloud-reflections-in-water-15881-1920x1080.jpg) no-repeat");
            break;
          case "Rain":
            $("body").css("background", "url(http://images8.alphacoders.com/415/415520.jpg) no-repeat");
            break;
          case "Snow":
            $("body").css("background", "url(http://tremendouswallpapers.com/wp-content/uploads/2014/12/14983_winter_winter_scene.jpg) no-repeat");
            break;
          case "Haze":
            $("body").css("background", "url(https://blogshail.files.wordpress.com/2014/12/dsc06774.jpg) no-repeat");
            break;
          default:
            $("body").css("background", "url(http://wallpapercave.com/wp/IeFORpa.jpg) no-repeat");
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
