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

let newCityBtn = $(".newCity");
let recentS = [];
let fiveCardsEL = $(".fiveCards");
let iconIMGDIVEL = $(".weatherICONCD");
let cityName = "";

function display() {
  let pullData = JSON.parse(localStorage.getItem("cityNames"));
  if (pullData != null) {
    for (let i = 0; i < pullData.length; i++) {
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
  cityName = "Nigeria";
  callAPI();
}
display();

// Eixisting Button Listener
newButtonsEL.on("click", function (event) {
  event.preventDefault();
  console.log(event.target);
  cityName = event.target.id;
  console.log(cityName);
  fiveCardsEL.children().remove();
  iconIMGDIVEL.children().remove();
  callAPI();
});

//SEARCH BUTTON
searchbtn.on("click", function (event) {
  event.preventDefault();
  cityName = searchBarEL.val().trim();
  recentS.push(cityName);
  localStorage.setItem("cityNames", JSON.stringify(recentS)); //store in local
  newButtonsEL.append(
    '<button class="btn btn-primary" type="button">' + cityName + "</button>"
  ); //create button
  newCityBtn.text(cityName);
  fiveCardsEL.children().remove();
  iconIMGDIVEL.children().remove();
  callAPI();
});
//ORIGINAL API CALL
function callAPI() {
  let mainURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=1e41fe8715bf0efe92d1f293a98c2c2d";
  fetch(mainURL) //GET is the default.
    .then(function (response) {
      //GET responses
      return response.json();
    }) //required
    .then(function (data) {
      //Store this and create buttons in local Storage
      //ICON
      console.log(data);
      let iconE = data.weather[0].icon;
      let urlICON = "http://openweathermap.org/img/wn/" + iconE + "@2x.png";
      iconIMGDIVEL
        .append('<img alt = "Weather Icon" class="weatherIconI">')
        .attr("src", urlICON);
      let imgICON = $(".weatherIconI");
      imgICON.attr("src", urlICON);
      //OTHER DATA
      let nameDate =
        data.name + " (" + moment.unix(data.dt).format("MMM Do, YYYY") + ")";
      let temp = data.main.temp + " °F";
      if (temp > 100) {
        console.log("to hot");
      } else console.log("its nice outside");

      let wind = data.wind.speed + "MPH";
      let humidity = data.main.humidity + "%";
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      uv(lat, lon);
      //PRINT ON CARD
      nameDEL.text(nameDate);
      tempEL.text("Temperature: " + temp);
      windEL.text("Wind Speed: " + wind);
      humidtyEL.text("Humidity: " + humidity);
      UVEL.text("UV Index: " + uVIndex);
    });
}

function uv(lat, lon) {
  let uvURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=1e41fe8715bf0efe92d1f293a98c2c2d&exclude=minutely,hourly";
  fetch(uvURL)
    .then(function (response) {
      return response.json();
    }) //required
    .then(function (data) {
      uVIndex = data.current.uvi;
      fiveDays(data.daily);
    });
}
//FIVE DAY FORCAST
function fiveDays(dataList) {
  let temp = moment(dataList[5].dt_txt).format("ll");
  for (let i = 1; i < 6; i++) {
    // card needed for othere dates
    fiveCardsEL.append(
      `<div class="col-12 col-md-3 col-xl-2 fiveDayCards" style="padding:15px;"> <div class="card text-white bg-primary mb-3"><div class="card-body"><h3 class="card-title" id="dateName${i}"></h3><img alt="Weather" id ="weatherIconFD${i}" ><li id="tempFD${i}"></li><li id="windFD${i}"></li><li id="humidityFD${i}"></li></ul></div></div></div>`
    );
    let dateNameELH = $(`#dateName${i}`);
    let iconIMGDIVEL = $(`#weatherIconFD${i}`);
    let tempFDEL = $(`#tempFD${i}`);
    let windFDEL = $(`#windFD${i}`);
    let humFDEL = $(`#humidityFD${i}`);
    //STORE NEEDED DATA
    let nameDate = moment.unix(dataList[i].dt).format("MMM Do, YYYY");
    let icon = dataList[i].weather[0].icon;
    let temp = dataList[i].temp.day + " °F";
    let wind = dataList[i].wind_speed + " MPH";
    let humidity = dataList[i].humidity + "%";

    //PRINT ON CARD
    dateNameELH.text(nameDate);
    let urlICON = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    iconIMGDIVEL.attr("src", urlICON);
    tempFDEL.text("Temperature: " + temp);
    windFDEL.text("Wind Speed: " + wind);
    humFDEL.text("Humidity: " + humidity);
  }
  console.log("worked!");
}

console.log("WORKING!");
