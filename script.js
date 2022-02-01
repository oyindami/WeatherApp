let Entercity= $("#Entercity");
let searchcitybutton = $("#searchcitybutton");
///API keys from open weather source//
const apiKey = "1e41fe8715bf0efe92d1f293a98c2c2d"
let url = 'https://api.openweathermap.org/data/2.5/'

function(addEventListener)
addEventListener.searchcitybutton

cityButtonSearch.on("click", inputCity);
citySearch.on("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     inputCity();


const city = document. getElementById $("#Entercity")


fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=imperial&mode=xml", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "e720ccdb46msh86e5a226ae94a72p18652djsn86a91febdee3"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
	alert ("this works!")
});