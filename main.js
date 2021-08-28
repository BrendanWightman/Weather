const api = {
    key: "ba35ca11430082c14be8abc7bff697df", 
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
const imageID = ['Clouds', 'Clear', 'Snow', 'Rain'];

function init(){
    fetch(`${api.base}weather?q=Stow,us&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function setQuery(evnt){
    if (evnt.keyCode == 13){
        getResults(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_el = document.querySelector('.current .weather');

    // This displays the image
    for(i = 0; i < imageID.length; ++i){
        document.getElementById(imageID[i]).style.display = "none";
    }
    
    //Take out later when more icons are added
    let currentCon = weather.weather[0].main;
    if(currentCon == 'Thunderstorm' || currentCon =='Drizzle' || currentCon == 'Mist' ||
        currentCon == 'Haze' || currentCon == 'Fog'){
            currentCon = 'Rain';
        }
    document.getElementById(currentCon).style.display = "block";

    //Sets the hi and low temps
    weather_el.innerText = (weather.weather[0].description).toUpperCase();
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `Hi ${Math.round(weather.main.temp_max)}°F / Low ${Math.round(weather.main.temp_min)}°F`;
}

function dateBuilder(d){
    let months = ['January', 'February', 'March', 'April', 'May', 
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`;
}



