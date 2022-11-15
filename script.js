const searchInp = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const weatherDiv = document.getElementById('weather');

async function getTemp(){
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=1de312eefbe68f2e6d01aab3b718e659&units=metric');
    const weatherData = await response.json();
    console.log(weatherData);
}

getTemp();