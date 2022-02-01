///API keys from open weather source//
let apiKey = "1e41fe8715bf0efe92d1f293a98c2c2d"; // oyins API key
let url = "https://api.openweathermap.org/data/2.5/";

let searchbtn = $(".searchBTN");
let searchBarEL = $("#searchBAR");
let newButtonsEL = $(".newButtons");
let currentDateEL = $(".currentDate");
let nameDEL = $(".nameDate");
let tempEL = $(".tempCD");
let windEL = $(".windCD");
let humidtyEL = $(".humidityCD");
let VCDEL = $(".uVCD");
let uVIndex = 0.0;
let iconIMGDIVEL = $(".weatherICONCD");
let newCityBtn = $(".newCity");
var recentS = [];

//SEARCH BUTTON
searchbtn.on("click", function (event) {
  event.preventDefault();
  cityNameP = searchBarEL.val().trim(); //Get value
  recentS.push(cityNameP); //update array
  localStorage.setItem("cityNames", JSON.stringify(recentS)); //store in local
  newButtonsEL.append(
    '<button class="btn btn-primary" type="button">' + cityNameP + "</button>"
  );
});

function display() {
  var pullData = JSON.parse(localStorage.getItem("cityNames"));
  if (pullData != null) {
    for (var i = 0; i < pullData.length; i++) {
      newButtonsEL.append(
        '<button class="btn btn-primary" type="button"' +
          "id=" +
          '"' +
          pullData[i] +
          '"' +
          ">" +
          pullData[i] +
          "</button>"
      );
    }
  }
  cityNameP = "Nigeria"; //Default
  callAPI();
}
display();

newButtonsEL.on("click", function (event) {
  event.preventDefault();
  console.log(event.target);
  cityNameP = event.target.id;
  console.log(cityNameP);
  fiveCardsEL.children().remove(); //clears the 5 cards for new days!
  iconIMGDIVEL.children().remove(); //clears images
  callAPI();
});

//Calling from the open weather app API
function callAPI() {
  var mainURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityNameP +
    "&units=imperial&appid=1e41fe8715bf0efe92d1f293a98c2c2d";
  fetch(mainURL) //GET is the default.
    .then(function (response) {
      //GET responses
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var iconE = data.weather[0].icon;
      var urlICON = "http://openweathermap.org/img/wn/" + iconE + "@2x.png";
      iconIMGDIVEL
        .append('<img alt = "Weather Icon" class="weatherIconI">')
        .attr("src", urlICON);
      var imgICON = $(".weatherIconI");
      imgICON.attr("src", urlICON);

      var nameDate =
        data.name + " (" + moment.unix(data.dt).format("MMM Do, YYYY") + ")";
      var temp = data.main.temp + " °F";
      var wind = data.wind.speed + "MPH";
      var humidity = data.main.humidity + "%";
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      uv(lat, lon);

      //card information is pasted
      nameDEL.text(nameDate);
      tempEL.text("Temperature: " + temp);
      windEL.text("Wind Speed: " + wind);
      humidtyEL.text("Humidity: " + humidity);
      VCDEL.text("UV Index: " + uVIndex);
    });
}
// UV INDEX 2nd API CALL
function uv(lat, lon) {
  var uvURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=1e41fe8715bf0efe92d1f293a98c2c2d8&exclude=minutely,hourly";
  fetch(uvURL)
    .then(function (response) {
      //GET responses
      return response.json();
    })
    .then(function (data) {
      uVIndex = data.current.uvi;
      fiveDays(data.daily);
    });
}

console.log("WORKING!");
